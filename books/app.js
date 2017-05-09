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

app.get('/', function(req, res) {
  res.send('Happy to be here yo!!');
});

app.post('/book', function(req, res) {
  var newBook = new Book();

  newBook.title = req.body.title;
  newBook.author = req.body.author;
  newBook.category = req.body.category;

  newBook.save(function(err, book) {
    if (err) {
      res.send(err);
    } else {
      console.log(book);
      res.send(book);
    }
  });
});

app.get('/books', function(req, res) {
  Book.find({})
    .exec(function(err, books) {
      if (err) {
        res.send(err);
      } else {
        console.log(books);
        res.json(books);
      }
    });
});

app.get('/books/:id', function(req, res){
  Book.findOne({
    _id: req.params.id
  })
  .exec(function(err, book) {
    if (err) {
      res.send(err);
    } else{
      console.log(book);
      res.json(book);
    }
  })
});

app.listen(PORT, function() {
  console.log(`app listening on port ${PORT}`);
});
