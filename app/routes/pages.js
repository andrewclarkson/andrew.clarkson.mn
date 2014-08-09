var express = require("express");
var router = express.Router();

router.get('/', function(req, res) {
    res.render('index');
});

router.get('/about', function(req, res) {
    res.cookie('name', 'hell');

    res.render('about');
});

router.get('/projects', function(req, res) {
    res.render('projects');
});

module.exports = router;
