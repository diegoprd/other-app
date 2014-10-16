var _ = require('underscore');

module.exports = function(app) {

  app.get('/', function(req, res) {
    res.render('index');
  });

  app.get('/authenticate', function(req, res){
    res.render('authenticate');
  });

  app.get('/signup', function(req, res) {
    res.render('signup');
  });

};