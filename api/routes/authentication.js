var _ = require('underscore');
var jwt = require('jsonwebtoken');
var mongoose = require('mongoose');
var User = require('../models/user');
var userValidator = require('../../common/validators/userValidator');
var emailValidator = require('../../common/validators/emailValidator');


module.exports = function(app) {
	
	app.post('/signup', function(req, res, next) {

    if (req.body.username && req.body.password && req.body.fullname) {
      //picking params
      var userProperties = {
        fullname: req.body.fullname,
        username: req.body.username,
        password: req.body.password
      };

      var validator = userValidator.validate(userProperties);

      if (validator.valid) {
        User.create(new User(userProperties), function(err, user) {
          if (err) next(err);

          next();
        });
      } else {
        console.log(validator.errors);
        res.statusCode = 422;
        res.send(validator.errors);
      }
    } else {
      var message = 'All fields are mandatory to signup (username, password and fullname)';
      return res.send(401, [{message: message}]);
    }

  },_authenticate);

	app.post('/authenticate', function(req, res, next) {

    if (req.body.username && req.body.password) {
    	//TODO validate req.body.username and req.body.password
	    //if is invalid, return 401
	    if (req.body.username.indexOf(' ') !== -1 || req.body.password.indexOf(' ') !== -1 ) {
	      var message = 'Username and Password cannot contain spaces';
	      res.send(401, [{message: message}]);
	    }

      var eValidator = emailValidator.validate(req.body.username);

      if(eValidator.valid){
        _authenticate(req,res,next);
      } else {
        res.send(422, eValidator.errors);
      }


    } else {
			var message = 'Username and Password are both mandatory fields';
	    res.send(401, [{message: message}]);
    }

  });

};

var _authenticate =   function(req, res, next) {

      //Validating user
      User.findOne({username: req.body.username}, function(err, user) {
        
        if (err) next(err);
        
        if (_.isNull(user)){
          return res.send(404, [{message:'Authentication failed, double check your credentials'}]);
        }

        //Validating credentials
        if (user.password != req.body.password) { 
          res.statusCode = 401;
          res.send([{message: 'Authentication failed, double check your credentials'}]);
        }

        // Creating the Token
        var token = jwt.sign({userId: user._id}, 'toptal-jogging', { expiresInMinutes: 60*5 });

        //Retriving token and full name for displaying purposes
        res.json({ fullname: user.fullname, token: token });

      });
      
  };
