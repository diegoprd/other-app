var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');
var TimeView = require('./time');

var TimesListView = Backbone.View.extend({

  el: '.js-jogging-times-list',

  initialize: function(options) {
    this.notifications = options.notifications;
    this.timeViews = [];
    this.listenTo(options.collection, 'remove', this._removeItem);
    this.listenTo(options.collection, 'add', this._addItem);
  },

  render: function(){
    this.collection.each(function(timeEntry) {
      this._addItem(timeEntry);
    }, this);

    return this;
  },

  _removeItem: function(model) {
    var timeView = _(this.timeViews).findWhere({model: model});
    var filterdTimeViews = _(this.timeViews).without(timeView);
    
    this.stopListening(timeView);
    timeView.remove();
    this.timeViews = filterdTimeViews;
  },

  _addItem: function(model) {
    var timeView = new TimeView({model: model});
    this.listenTo(timeView, 'timeUpdateError', this._updateNotificationCenter);
    this.listenTo(timeView, 'timeUpdateSuccess', function(){
      this.notifications.addSuccessNotification('Time successfuly updated');
    }.bind(this));
    timeView.render();
    this.$el.append(timeView.el);
    this.timeViews.push(timeView);
  },

  _updateNotificationCenter: function(errors) {
    _.each(errors, function(error){
      this.notifications.addErrorNotification(error.message);
    },this)
  },


});

module.exports =  TimesListView;