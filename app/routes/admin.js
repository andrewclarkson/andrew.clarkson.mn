var express = require("express");
var uid = require('uid-safe');
var token = require('token');
var Form = require('formidable').IncomingForm;
var router = express.Router();
var User = require('../models/user');
var crypt = require('crypto');

token.defaults.secret = "secret";

var hashes = ['sha256'];

/*
 * Middleware to check for user permissions
 */
var permission = function(permission) {
    
    return function(req, res, next) {

        var user = req.cookies.get("user", {
            signed: true
        });


        /*
         * Make sure the user has a user cookie
         * if they don't they aren't logged in
         */
        if(!user) {

            /*
             * Use a cookie to pass a message to the login page
             */
            res.cookies.set('message', 'You need to be logged in access that', {
                //secure: true,
                path: "/admin/login",
                //domain: 'andrew.clarkson.mn',
                maxAge: 3 * 60 * 60

                
            });
            res.redirect('/admin/login');
            return;
        }

        /*
         * The user cookie should consist of:
         * a mongo object id (user id) and
         * a hmac hash signature to ensure its
         * integrity
         *
         * it is in the form "<id>.<hmac>"
         */
        user = user.split('.');
        var id = user[0];
        var signature = user[1];

        if(!token.verify(id, signature)) {
            res.status(500).render('500');
            return;
        }

        User.getById(id, '-password', function(err, user) {
            if(err) throw err;
            
            req.user = user;

            /*
             * Check that a user has the given permission on the
             * resource. The permission string should consist of:
             * <resource>.<action>
             */
            var parts = permission.split(".");
            var resource = parts[0];
            var action = parts[1];

            if(user.permissions[object] &&
               user.permissions[object][action]) {
               next();
            } else {
                res.render("admin/unauthorized");
            }
        });
    };
};




router.get("/", permission("admin.view"), function(req, res) {
    res.render('admin/index');
});

/*
 * Generates a secure login form
 */
router.get('/login', function(req, res) {
    
    /*
     * Read and clear a message that may or may
     * not have accompanied the request
     */
    var message = req.cookies.get("message");
    res.clearCookie('message', {path: '/admin/login'});
    
    /*
     * In order to generate a csrf token we need to generate a
     * unique id and a hmac token based on that id
     */
    uid(18, function (err, uid) {
        if(err) throw err;

       
        var csrf = token.generate(uid);
        
        /*
         * We need to keep the id in a cookie so we can
         * check if it's valid when the form is posted 
         */        
        res.cookies.set("uid", uid, {
            //secure: true,
            path: '/admin/login',
            //domain: 'andrew.clarkson.mn',
            signed: true,
            maxAge: 5 * 60 * 60
        });
    


        res.render('admin/login', {csrf: csrf, message: message});
    }); 
});

/*
 * Handles a login attempt
 */
router.post('/login', function(req, res) {
    
    /*
     * Get the unique id from a cookie so
     * we can use it to validate the csrf token
     */
    var uid = req.cookies.get("uid", {
        signed: true
    });

    if(!uid) {
        res.status(500).render('500');
        return;
    }

    /*
     * Parse the login form into its fields
     */
    var form = new Form();
    form.parse(req, function(err, fields, _) {
        
        if(err) {
            throw err;
        }
        
        var email = fields.email;
        var password = fields.password;
        var csrf = fields.csrf;
        
        if(!token.verify(uid, csrf)) {
            res.status(500).render('500');
            return; 
        }

        /*
         * Get a user by the email address in the login form
         * and only retrieve the password object
         */
        User.findOne({'email': email}, 'password', function(err, user) {
            if(err) {
                throw err;
            }

            if(!user) {
                    /*
                     * Even though we could get by with just not
                     * generating a new token, we might as well.
                     */
                    var csrf = token.generate(uid);
                    
                    res.cookies.set("uid", uid, {
                        //secure: true,
                        //domain: 'andrew.clarkson.mn',
                        path: '/admin/login',
                        expires: new Date(Date.now() + 30 * 60),
                        signed: true
                    });

                    var message = "Invalid username or password";
                    res.render('admin/login', {
                        csrf: csrf,
                        message: message,
                        email: email
                    });
                    return;
                
            }

            /*
             * Check to see what hashing algorithm the password
             * uses. If it has been deprecated or is no longer
             * used direct the user to a place to reset their 
             * password.
             */
            var algorithm = user.password.algorithm;
            var index = hashes.indexOf(algorithm); 

            if(algorithm === "deprecated" || index === -1) {
                res.render('admin/reset');
                return;
            }

            var hasher = crypto.createHash(algorithm);  
            var hash = hasher.update(password).digest();
            
            /*
             * If the login was invalid, re-render the form
             * this is better than a redirect because the email
             * field sticks around
             */
            if(hash != user.password.hash) {
                uid(18, function (err, uid) {
                    if(err) throw err;
                    
                    /*
                     * Even though we could get by with just not
                     * generating a new token, we might as well.
                     */
                    var csrf = token.generate(uid);
                    
                    res.cookies.set("uid", uid, {
                        //secure: true,
                        //domain: 'andrew.clarkson.mn',
                        path: '/admin/login',
                        expires: new Date(Date.now() + 30 * 60),
                        signed: true
                    });

                    var message = "Invalid username or password";
                    res.render('admin/login', {
                        csrf: csrf,
                        message: message,
                        email: email
                    });
                    return;
                }); 
                

            }

            /*
             * If the email and password are valid
             * clear the csrf and create a signed user
             * cookie.
             */
            res.clearCookie('uid', {path: '/admin/login'});

            /*
             * Note: we should extra careful with cookie paths where
             * some parts of the site aren't encrypted
             */
            res.cookies.set("user", user.id, {
                //secure: true,
                //domain: 'andrew.clarkson.mn',
                path: '/admin',
                signed: true,
                maxAge: 5 * 60 * 60
            });

            
            /*
             * If the hash that the password wasn't the newest,
             * aka in the front of the 'hashes' array rehash 
             * the password using the newest one.
             */
            if(index !== 0) {
                
                user.password = {
                    algorithm: hashes[0],
                    hash: hash
                };

                user.save(function(err) {
                    if(err) throw err;
                    res.redirect("admin");
                });

            } else {
                res.redirect("admin");
            }
        });
    });
});

/*
 * Destroy the user cookie (log a user out)
 */
router.get('/logout', function(req, res) {
    req.clearCookie('user', {path: '/admin'});
    res.redirect('admin/login');
});

module.exports = router;

