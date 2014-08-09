var express = require('express');
var path = require('path');
var jade = require('jade');
var mongoose = require('mongoose');
var Cookies = require('cookies');

var app = express();

app.engine('jade', jade.__express);

app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(Cookies.express(["secret"]));

mongoose.connect('mongodb://localhost/_andrewclarkson');

app.use('/', require('./routes/pages'));
app.use('/admin', require('./routes/admin'));

module.exports = app;

