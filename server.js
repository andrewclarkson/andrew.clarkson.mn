var app = require('./app')

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})
