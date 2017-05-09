var mongoose = require('mongoose');
var _ = require('lodash');
var lionRouter = require('express').Router();
var Lion = require('../models/lions');

// var lions = [];
// var id = 0;

// var updateId = function(req, res, next) {
//   if (!req.body.id) {
//     id++;
//     req.body.id = id + '';
//   }
//   next();
// };

// lionRouter.param('id', function(req, res, next, id) {
//   var lion = _.find(lions, {id: id});
//
//   if (lion) {
//     req.lion = lion;
//     next();
//   } else {
//     res.send();
//   }
// });

lionRouter.get('/', function(req, res) {
  Lion.find((err, lions) => {
    if (err) {
      res.send(err);
    }

    res.send(lions);
  });
});

lionRouter.get('/:id', function(req, res) {
  Lion.findById(req.params.id,(err, lion) => {
    if (err) {
      res.send(err);
    }

    res.json(lion);
  })
});

lionRouter.post('/', function(req, res) {
  // Receive the json lion object
  const lionObj = new Lion({
    name: req.body.name,
    age: req.body.age,
    pride: req.body.pride,
    gender: req.body.gender
  });

  lionObj.save((err) =>{
    if (err) {
      res.send(err);
    }

    res.json({message: 'Lion created' });
  });
});

lionRouter.put('/:id', function(req, res) {
  Lion.findById(req.params.id, (err, lion) => {
    if (err) {
      res.send();
    }
    if (req.body.name) {
      lion.name = req.body.name;
    }
    if (req.body.age) {
      lion.age = req.body.age;
    }
    if (req.body.pride) {
      lion.pride = req.body.pride;
    }
    if (req.body.gender) {
      lion.gender = req.body.gender;
    }

    lion.save((err) => {
      if (err) {
        res.send(err);
      }

      res.json({message: 'Updated the lion'});
    });
  });
});

lionRouter.delete('/:id', function(req, res) {
  Lion.remove({_id: req.params.id}, (err, lion) => {
    if (err) {
      res.send(err);
    }

    res.json({message: 'Deleted the Lion!'});
  });
});

module.exports = lionRouter;
