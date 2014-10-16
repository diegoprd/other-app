var _ = require('underscore');
var jwt = require('jsonwebtoken');
var moment = require('moment');
var Time = require('../models/time');
var dateValidator = require('../../common/validators/dateValidator');

module.exports = function(app) {
  
  app.get('/times/report', function(req, res, next) {
    
    var criteria = {userId: req.user.userId};
    var dateCriteria = {};
    
    var validator = dateValidator.validate(req.query.date)

    if (validator.valid) {
      var date = moment(req.query.date, "YYYY-MM-DD").zone(0);

      dateCriteria["$gte"] = date.startOf('week').zone(0).format('YYYY-MM-DD');
      dateCriteria["$lte"] = date.endOf('week').zone(0).format('YYYY-MM-DD');
      criteria["date"] = dateCriteria;

      var weeklyDistance =  0; 
      var weeklyTime = 0;
      var WeeklyCount = 0;
      
      Time.find(criteria, function(err, times) {
        if (err) return next(err);

        _.each(times, function(time) {
          weeklyDistance += time.distance;
          weeklyTime += time.time;
          WeeklyCount++;
        });

        res.send({
            weeklyDistance: (weeklyDistance/WeeklyCount).toFixed(2),
            weeklySpeed: (weeklyDistance/weeklyTime).toFixed(2)
        });
      });
    } else {
      console.log(validator.errors);
      res.statusCode = 422;
      res.end("Invalid date!");
    }

  });
};