var express = require('express');
var apiServer = require('./api');
var webApp = require('./webApp');
var mongoose = require('mongoose');

//Initializing Main mondo db
var mongoUri = process.env.MONGOLAB_URI ||
    process.env.MONGOHQ_URL || 'mongodb://localhost/my-ideal-app';
mongoose.connect(mongoUri);

//Initializing Main Express
var app = express();
app.use(express.logger());

//Including the API and webapp as a middleware
app.use('/api', apiServer);
app.use(webApp)

var port = process.env.PORT || 5000;
app.listen(port);
console.log('Starting -My Ideal App- on port: ' + port);
