var express = require('express');
var app = express();
const PORT = 8080;

app.get('/', function(req, res) {
  res.end('hello world');
});

app.listen(PORT, function() {
  console.log(`Listening on port ${PORT}`);
});
