var Backbone = require('backbone');

var Time = Backbone.Model.extend({
  idAttribute: "_id",
  urlRoot : 'api/times'
});

module.exports = Time;