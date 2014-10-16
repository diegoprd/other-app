var Backbone = require('backbone');
var TimesCollection = require('../collections/times');
var TimesListView = require('./timesList');
var TimeFormView = require('./timeEntryForm');
var HeaderView = require('./header');
var FiltersView = require('./filter');
var ReportView = require('./report');
var Notifications = require('../collections/notifications');
var NotificationsCenterView = require('./notificationsCenter');
var $ = require('jquery');
var _ = require('underscore');

var AppView = Backbone.View.extend({

  el: '.js-jogging-app',

  initialize: function() {

    this._validateLoggedIn();
    console.log('Welcome To the Jogging app');

    //Initializing header view
    this.headerView = new HeaderView();
    this.headerView.render();

    //Initializing the notifications center
    this.notifications = new Notifications();
    this.notificationsCenter = new NotificationsCenterView(this.notifications);
    this.notificationsCenter.render();

    //Initializing form view
    this.timeFormView = new TimeFormView(this.notifications);
    this.timeFormView.render();

    //Rederibng filters
    this.filtersView = new FiltersView(this.notifications);
    this.filtersView.render();

    //Initializing list view with the time entries of the logged user
    this.times = new TimesCollection();

    this.times.fetch({
      success: function(data) {
        console.log('Times Collection Fetched successfuly');

        //Rendering the times list view
        this.timesListView = new TimesListView({collection: this.times, notifications: this.notifications});
        this.timesListView.render();

      }.bind(this),
      'error': function(data, resp) {
        console.log(resp.statusText);
      }
    });

    //Initializing report view
    this.reportView = new ReportView();
    this.reportView.render();

    this.listenTo(this.timeFormView, 'timeCreated', this._addTime);
    this.listenTo(this.filtersView, 'filtering', this._filterCollection);
  },

  _addTime: function(model) {
    this.times.add(model);
  },

  _filterCollection: function(filter) {

    var criteria = {};

    if(filter.from) criteria['from'] = filter.from;

    if(filter.to) criteria['to'] = filter.to;

    this.times.fetch({
      data: criteria,
      success: function(data) {
        console.log('Times Collection Fetched successfuly');
        //Updating collection
        //this.times = data;
        
      }.bind(this),
      'error': function(data, resp) {
        _.each(resp.responseJSON, function(error) {
          this.notifications.addErrorNotification(error.message);
        }.bind(this));
        

        console.log(resp.status);
      }.bind(this)

    });
  },

  _validateLoggedIn: function() {
    if(!localStorage.token) window.location = "/authenticate"
  }

});

module.exports =  AppView;
