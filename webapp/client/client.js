var jQuery = require('jquery');
var Backbone = require('backbone');
var AppView = require('./views/app');
var rivets = require('rivets');
var moment = require('moment');

//Configuring Vendors
Backbone.$ = jQuery;

//Configuring Backbone Sync to add the token to the headers
var backboneSync = Backbone.sync;

Backbone.sync = function (method, model, options) {

  if (!options.headers) options.headers= {};

  if (localStorage.token) {
    options.headers['Authorization'] = 'Bearer ' + localStorage.token;
  }
    
  // Call the stored original Backbone.sync method with extra headers argument added
  backboneSync(method, model, options);
};

//Configuring Rivets
rivets.adapters[':'] = {
  subscribe: function(obj, keypath, callback) {
    obj.on('change:' + keypath, callback)
  },
  unsubscribe: function(obj, keypath, callback) {
    obj.off('change:' + keypath, callback)
  },
  read: function(obj, keypath) {
    return obj.get(keypath)
  },
  publish: function(obj, keypath, value) {
    obj.set(keypath, value)
  }
}

rivets.formatters.date = function(value) {
  return moment(value).format('MMM DD, YYYY')
};

//Starting App
var app = new AppView();



