var _ = require('underscore');
var jwt = require('jsonwebtoken');
var Time = require('../models/time');
var timeValidator = require('../../common/validators/timeValidator');
var dateValidator = require('../../common/validators/dateValidator');

module.exports = function(app) {

  app.get('/times', function(req, res, next) {

    var criteria = {userId: req.user.userId};

    var fromValidator = dateValidator.validate(req.query.from);
    var toValidator = dateValidator.validate(req.query.to);

    if(fromValidator.valid && toValidator.valid){
      if(req.query.from) {
        criteria['date'] = {"$gte": req.query.from};

        if (req.query.to)
          criteria.date["$lt"] = req.query.to;
      } else {
        if(req.query.to) {
          criteria['date'] = {"$lt": req.query.to};
        }
      }

      Time.find(criteria, function(err, times) {
        if (err) next(err);

        res.send(times);
      });

    } else {
      res.statusCode = 422;
      res.send(_.union(fromValidator.errors, toValidator.errors));
    }


  });

  app.post('/times', function(req, res, next) {

    var timeProperties = {
      date: (req.body.date === '')? new Date().toString(): req.body.date,
      distance: req.body.distance,
      time: req.body.time,
      userId: req.user.userId
    };
    
    var validator = timeValidator.validate(timeProperties);

    if (validator.valid) {
      timeProperties.date = new Date(timeProperties.date).getTime();

      Time.create(new Time(timeProperties), function(err, time) {
        if (err) next(err);

        res.send(200, time);
      });
    } else {
      console.log(validator.errors);
      res.statusCode = 422;
      res.send(validator.errors);
    }


  });

  app.put('/times/:id', _findTime, function(req, res, next) {

    //picking properties from request params
    var timeProperties = {
      date: (req.body.date === '')? new Date().toString(): req.body.date,
      distance: req.body.distance,
      time: req.body.time,
      userId: req.user.userId
    };
    
    var validator = timeValidator.validate(timeProperties);

    if (validator.valid) {

      timeProperties.date = new Date(timeProperties.date).getTime();

      _.extend(req.time, timeProperties);

      req.time.save( function(err, savedItem) {
        if (err) next(err);

        res.send(200, savedItem);
      });
    } else {
      console.log(validator.errors);
      res.statusCode = 422;
      res.send(validator.errors);
    }

  });

  app.delete('/times/:id', _findTime, function(req, res, next) {
    
    req.time.remove( function(err, deletedItem) {
      if (err) next(err);

      res.send(200, deletedItem);
    });

  });

};

var _findTime = function(req, res, next) {

  //Retrieve the time entity
  Time.findById(req.params.id, function(err, time) {
    
      if (err || _.isNull(time) || !req.user.userId === time.userId) {
        res.statusCode = 404;
        res.end("Not found");
      }

      req.time = time;
      next();
  });

};
