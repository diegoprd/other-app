var Backbone = require('backbone');
var $ = require('jquery');
var TimeModel = require('../models/time');
var hbsTemplate = require('../../server/views/partials/entryForm.hbs');
var _ = require('underscore');

var TimeFormView = Backbone.View.extend({

  el: '.js-jogging-entry-form',

  events: {
    'submit .js-entry-form' : '_createTime'
  },

  initialize: function(notifications){
    this.notifications = notifications;
  },

  render: function() {
    this.$el.html(hbsTemplate());
    return this;
  },

  _createTime: function(e) {
    e.preventDefault();
    
    var time = {
      date : this.$('input[name=date]').val(),
      distance : this.$('input[name=distance]').val(),
      time : this.$('input[name=time]').val()
    };

    var timeModel = new TimeModel();

    timeModel.save(time, {
      success: function(data) {
        console.log(data);
        this.notifications.addSuccessNotification('Activity successfuly created!');
        this.trigger('timeCreated', data);
      }.bind(this),
      error: function(data, resp) {
        console.log('Error - There was an error while trying to create the time');

        _.each(resp.responseJSON, function(error) {
          this.notifications.addErrorNotification(error.message);
        }.bind(this));

        if (resp.status === 401) window.location = '/authenticate';
      }.bind(this)
    });
  }

});

module.exports = TimeFormView;