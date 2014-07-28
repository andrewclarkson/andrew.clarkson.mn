var express = require('express');
var path = require('path');
var jade = require('jade');
var cookie = require('cookieParser');

var pages = require('./routes/pages');
//var admin = require('./routes/admin');

var app = express();

app.engine('jade', jade.__express);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cookieParser(process.env.));

app.use('/', pages);
//app.use('/admin', admin);


app.set('port', (process.env.PORT || 5000));
app.use(express.static(__dirname + '/static'));

module.exports = app;

