var Backbone = require('backbone');
var $ = require('jquery');
var ui = require('jquery-ui');
var notificationTemplate = require('../../server/views/partials/notification.hbs');
var _ = require('underscore');

var NotificationsCenterView = Backbone.View.extend({

  el: ".js-notifications-center",

  initialize: function(notifications) {
    this.notifications = notifications;
    this.listenTo(notifications, 'add', _.bind(this._showNotification, this));
  },

  _showNotification: function(notification) {
    var $notification = $(notificationTemplate({
      message: notification.get('message'),
      type: notification.get('type')
    }));

    this.$el.prepend($notification);

    setTimeout(function() {
      this.notifications.remove(notification);

      $notification.fadeOut(function() {
        $notification.remove();
      });
    }.bind(this), 8000);
  }

});

module.exports =  NotificationsCenterView;