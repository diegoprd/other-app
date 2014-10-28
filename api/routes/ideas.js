var _ = require('underscore');
var jwt = require('jsonwebtoken');
var Idea = require('../models/idea');
var User = require('../models/user');
var ideaValidator = require('../validators/ideaValidator');
var criteriaValidator = require('../validators/criteriaValidator');

module.exports = function(app) {

  app.get('/ideas', _generateCriteria, function(req, res, next) {

    var criteria = req.criteria;

    var validator = criteriaValidator.validate(criteria);

    if(validator.valid){

      Idea.find(criteria, function(err, ideas) {
        if (err) next(err);

        res.send(ideas);
      });

    } else {
      res.statusCode = 422;
      res.send(validator.errors);
    }
  });

  //Creating a new idea
  app.post('/ideas', function(req, res, next) {
    var ideaProperties = {
      creationDate: new Date().getTime(),
      title: req.body.title,
      fullDescription: req.body.fullDescription,
      mvpDescription: req.body.mvpDescription,
      status: 'PENDING_APPROVAL',
      innovatorId: req.user.userId
    };
    
    var validator = ideaValidator.validate(ideaProperties);

    if (validator.valid) {

      Idea.create(new Idea(ideaProperties), function(err, idea) {
        if (err) next(err);

        res.send(200, idea);
      });
    } else {
      console.log(validator.errors);
      res.statusCode = 422;
      res.send(validator.errors);
    }
  });

  //Updating existent idea
  app.put('/ideas/:id', _findIdea, function(req, res, next) {

    //picking properties from request params
    var ideaProperties = {
      title: req.body.title,
      fullDescription: req.body.fullDescription,
      mvpDescription: req.body.mvpDescription,
      status: req.body.status,
      engineerId: req.user.engineerId
    };
    
    var validator = ideaValidator.validate(ideaProperties);

    if (validator.valid) {

      _.extend(req.idea, ideaProperties);

      req.idea.save( function(err, savedItem) {
        if (err) next(err);

        res.send(200, savedItem);
      });
    } else {
      console.log(validator.errors);
      res.statusCode = 422;
      res.send(validator.errors);
    }

  });

  app.delete('/ideas/:id', _findIdea, function(req, res, next) {
    
    req.idea.remove( function(err, deletedItem) {
      if (err) next(err);

      res.send(200, deletedItem);
    });

  });

};

var _findIdea = function(req, res, next) {
  //Retrieve the idea entity
  Idea.findById(req.params.id, function(err, idea) {
    
      if (err || _.isNull(idea) || (!req.user.userId === innovatorId.userId || !req.user.userId === engineerId.userId)) {
        res.statusCode = 404;
        res.end("Idea Not found");
      }

      req.idea = idea;
      next();
  });
};

var _generateCriteria = function(req, res, next) {

  var criteria = {};

  //Retrieve the idea entity
  User.findById(req.user.userId, function(err, user) {
    
      if (err || _.isNull(user)) {
        res.statusCode = 404;
        res.end("User Not found");
      }

      if(user.type === 'INNOVATOR'){
        criteria.innovatorId = req.user.userId;
      }

      req.criteria = criteria;
      next();
  });
};
