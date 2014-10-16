var Backbone = require('backbone');
var $ = require('jquery');
var hbsTemplate = require('../../server/views/partials/filter.hbs');

var FilterView = Backbone.View.extend({

  el: ".js-filters",

  events: {
    "submit .js-filters-form": "_filter",
    "click .js-undo-filter": "_undoFilter"
  },

  render: function() {
    this.$el.html(hbsTemplate());
    return this;
  },

  _filter: function(e) {

    e.preventDefault();

    var filter = {
      from : this.$('input[name=from]').val(),
      to : this.$('input[name=to]').val()
    };

    this.trigger('filtering', filter);
  },

  _undoFilter: function(e) {
    e.preventDefault();

    this.$('input[name=from]').val(''); 
    this.$('input[name=to]').val('');

    this.trigger('filtering', {});
  }

});

module.exports =  FilterView;