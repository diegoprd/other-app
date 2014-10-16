var Backbone = require('backbone');
var Time = require('../models/time');

var TimesList = Backbone.Collection.extend({
   model: Time,
   url: 'api/times'
});

module.exports = TimesList;