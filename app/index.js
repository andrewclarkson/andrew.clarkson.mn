var express = require('express');
var path = require('path');
var jade = require('jade');
var bodyParser = require('body-parser');
var app = express();

app.engine('jade', jade.__express);

app.set('port', (process.env.PORT || 5000));

app.set('posts', path.join(process.cwd(), 'posts'));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/static'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/posts', require('./routes/posts'));

app.use('/payload', require('./routes/github'));

module.exports = app;
