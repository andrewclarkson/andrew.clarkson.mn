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

router.get('/:slug', function(req, res) {
  
    var filename = path.join(req.app.get('posts'), req.params.slug);
    fs.readFile(filename + '.md', {encoding: 'utf8'}, function(err, data) {
        if(err) {
            switch(err.errno) {
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

        switch(req.accepts(['html', 'json'])) {
            case 'html':
                return res.render('post', post);
                break;
            case 'json':
                return res.status(200).send(JSON.stringify(post));
                break;
            default:
                return res.status(406).send("Cannot Create That Type"); 
                break;
        }

    });
});

module.exports = router;
