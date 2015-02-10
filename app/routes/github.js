var express = require('express');
var router = express.Router();
var crypto = require('crypto');
var hmac = crypto.createHmac('sha1', process.env.GITHUB_SECRET);
var Git = require('git-wrapper');


var verifySignature = function(actual, expected) {
    if(actual.length != expected.length) {
        return false;
    }
    var result = 0;
    for(i = 0; i < actual.length; i++) {
        result |= actual ^ expected;
    }
    return result === 0;
}

router.post('', function(req, res) {
    if(req.get('X-Github-Event') != 'push') {
        return res.status(202).send('Event wasn\'t a "push"');
    }

    var signature = hmac.update(res.body).digest('hex');
    if(!verifySignature('sha=' + signature, req.get('X-Hub-Signature'))) {
        return res.status(401).send('Signatures didn\'t match');
    }

    var ref = res.body['ref'];
    if(ref != 'refs/heads/master') {
        return res.status(202).send('Branch wasn\'t "master"');
    }

    var repo = req.body['repository']['url'];


    res.send(repo);


});
