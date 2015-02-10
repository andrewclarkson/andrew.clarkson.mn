var express = require("express");
var router = express.Router();
var fs = require("fs");
var path = require('path');
var Showdown = require('showdown')
var converter = new Showdown.converter();

router.get('', function(req, res) {
    posts.index({
        'page': req.params.page,
        'response': res,
        'type': req.get('Content-Type')
    });
});

router.get('/:slug', function(req, res) {
  
    var filename = path.join(req.app.get('posts'), req.params.slug);
    fs.readFile(filename + '.md', function(err, data) {
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

        res.status(200).send(converter.makeHtml(data.toString('utf8')));

    })
});

module.exports = router;
