var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var _ = require('lodash');
var morgan = require('morgan');
var mongoose = require('mongoose');

mongoose.connect('mongodb://yoda:yoda@ds133261.mlab.com:33261/lions');

var lionRouter = require('./lions');
var tigerRouter = require('./tigers');

app.use(morgan('dev'));
app.use(express.static('client'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// This is called mounting. when a req comes in for
// /lion, we want to use this router
app.use('/lions', lionRouter);
app.use('/tigers', tigerRouter);


app.use(function(err, req, res, next) {
  if (err) {
    res.status(500).send(error);
  }
});

app.listen(3000);
