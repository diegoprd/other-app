var Backbone = require('backbone');

var Notifications = Backbone.Collection.extend({

  addErrorNotification: function(message) {
    this.add({message: message, type: 'error'});
  },

  addSuccessNotification: function(message) {
    this.add({message: message, type: 'success'});
  }

});

module.exports = Notifications;