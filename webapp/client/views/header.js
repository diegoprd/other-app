var Backbone = require('backbone');
var $ = require('jquery');
var hbsTemplate = require('../../server/views/partials/header.hbs');

var HeaderView = Backbone.View.extend({

  el: ".js-header",

  events: {
    "click .js-signout": "_signOut"
  },

  render: function() {
    this.$el.html(hbsTemplate(localStorage));
    return this;
  },

  _signOut: function(e) {
    e.preventDefault();
    delete localStorage.token;
    delete localStorage.fullname;
    window.location = '/authenticate';
  }

});

module.exports =  HeaderView;