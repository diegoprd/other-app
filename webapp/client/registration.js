var jQuery = require('jquery');
var Backbone = require('backbone');
var RegistrationView = require('./views/registration');

//Configuring Vendors
Backbone.$ = jQuery;

//Starting Registration view
var registrationView = new RegistrationView();
