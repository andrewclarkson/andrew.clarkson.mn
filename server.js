var app = require('./app');
var path = require('path');
var Memcached = require('memcached');
var memcached = new Memcached('localhost:11211');

app.set('cache', memcached);
app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
});
