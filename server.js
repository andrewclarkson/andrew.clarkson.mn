var app = require('./app');
var path = require('path');

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
