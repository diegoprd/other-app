var Backbone = require('backbone');
var $ = require('jquery');
var timeModel = require('../models/time');
var hbsTemplate = require('../../server/views/partials/time.hbs');
var rivets = require('rivets');
window.$ = $;

var TimeView = Backbone.View.extend({

  className: "js-time-item time-item",

  events: {
    "click .js-delete-time": "_destroyModel",
    "click .js-edit-time": "_editItem",
    "click .js-save-time": "_saveChanges"
  },

  render: function() {
    this.$el.html(hbsTemplate(this.model.toJSON()));
    this.$('.js-average-speed').val(((this.model.attributes.distance/this.model.attributes.time).toFixed(2)));
    
    this.viewState = new Backbone.Model({readOnly: true});
    
    rivets.bind(this.$el, {model: this.model, viewState: this.viewState});
    
    return this;
  },

  _destroyModel: function(e) {
    e.preventDefault();
    this.model.destroy({
      wait:true,
      error: function(model, resp) {
        console.log('Error - There was an error while trying to destoy the entry.');
        if (resp.status === 401) window.location = '/authenticate';
      }
    });
  },

  _editItem: function(e) {
    e.preventDefault();
    this.$('.js-save-time').show();
    this.viewState.set('readOnly', false);
    $(e.target).hide();
  },

  _saveChanges: function(e) {
    e.preventDefault();

    this.model.save([],{
      success: function(data) {
        $(e.target).hide();
        this.$('.js-edit-time').show();       
        this.viewState.set('readOnly', true);
        this.trigger('timeUpdateSuccess');
      }.bind(this),
      error: function(data, resp) {
        console.log('Error - There was an error while trying to update the entry.');
        if (resp.status === 401) window.location = '/authenticate';
        this.trigger('timeUpdateError', resp.responseJSON);
      }.bind(this)
    });
  }

});

module.exports =  TimeView;