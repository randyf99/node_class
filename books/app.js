var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var Book = require('./models/books');

const PORT = 7777;
const db = 'mongodb://yoda:yoda@ds133261.mlab.com:33261/lions'

mongoose.connect(db);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, function() {
  console.log(`app listening on port ${PORT}`);
});
