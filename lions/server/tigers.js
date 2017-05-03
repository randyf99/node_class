var _ = require('lodash');
var tigerRouter = require('express').Router();

var tigers = [];
var id = 0;

var updateId = function(req, res, next) {
  if (!req.body.id) {
    id++;
    req.body.id = id + '';
  }
  next();
};

tigerRouter.param('id', function(req, res, next, id) {
  var tiger = _.find(tigers, {id: id});

  if (tiger) {
    req.tiger = tiger;
    next();
  } else {
    res.send();
  }
});

tigerRouter.get('/', function(req, res) {
  res.json(tigers);
});

tigerRouter.get('/:id', function(req, res) {
  var tiger = req.iger;
  res.json(tiger || {});
});

tigerRouter.post('/', updateId, function(req, res) {
  var tiger = req.body;

  lions.push(tiger);
  res.json(tiger);
});

tigerRouter.put('/:id', function(req, res) {
  var update = req.body;
  if (update.id) {
    delete update.id;
  }

  var tiger = _.findIndex(lions, {id: req.params.id});
  if (!tigers[tiger]) {
    res.send();
  } else {
    var updatedTiger = _.assign(tigers[tiger], update);
    res.json(updatedTiger);
  }
});

tigerRouter.delete('/:id', function(req, res) {
  var tiger = _.findIndex(tigers, {id: req.params.id});
  if (!tigers[tiger]) {
    res.send();
  } else {
    var deletedTiger = tigers[tiger];
    lions.splice(tiger, 1);
    res.json(deletedTiger);
  }
});

module.exports = tigerRouter;
