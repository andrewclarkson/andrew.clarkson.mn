var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require('path');
var Showdown = require('showdown')
var converter = new Showdown.converter();
var yaml = require('yaml');

router.get('', function(req, res) {
    posts.index({
        'page': req.params.page,
        'response': res,
        'type': req.get('Content-Type')
    });
});

var cacheAndSend = function(req, res, key, value) { 
    req.app.get('cache').set(key, value, 604800, function(err) {
        if(err) {
            console.log(err);
        } 
        res.status(200).send(value);
    });
};

router.get('/:slug', function(req, res) {
  
    var type = req.accepts(['html', 'json']);

    if(!type) {
        return res.status(406).send("Cannot Create That Type"); 
    }

    var key = req.params.slug + '.' + type;
    req.app.get('cache').get(key, function(err, data) {
        if(err) {
            console.log(err);
        } else if (data) {
            return res.status(200).type(type).send(data);
        }
    
        var filename = path.join(req.app.get('posts'), req.params.slug);
        fs.readFile(filename + '.md', {encoding: 'utf8'}, function(err, data) {
            if (err) {
                switch (err.errno) {
                    case 34:
                        return res.status(404).send("Post not found");
                        break;
                    default:
                        return res.status(500).send("Internal Server Error");
                        break;
                }
            }

            var parts = data.split('---', 3);

            var post = yaml.eval(parts[1].trimLeft());
            post.content = converter.makeHtml(parts[2]);

            if (type == 'html') {
                value = req.app.render('post', post, function(err, html) {
                    if (err) { 
                        throw err;
                    }
                    cacheAndSend(req, res, key, html);
                });
            } else {
                cacheAndSend(req, res, key, JSON.stringify(post));
            } 
        });
    });
});



module.exports = router;
