var express = require('express');
var _ = require('underscore');
var glob = require('glob');
var routesPath = __dirname + "/routes/";
var expressJwt = require('express-jwt');
var app = module.exports = express();

//Initializing API Express
app.use(expressJwt({secret: 'toptal-jogging', skip: ['/authenticate', '/signup']}));
app.use(express.json());
app.use(express.urlencoded());

//Initializing API Routes (Dynamically loading all entry points in all the .JS files inside routes folder)
_.each(glob.sync(routesPath + "*.js"), function(file){

	var route = file.substr(0, file.indexOf('.'));
	console.log('Adding route:' + route);
	require(route)(app);
  
});
