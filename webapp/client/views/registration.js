var Backbone = require('backbone');
var $ = require('jquery');
var _ = require('underscore');

var  RegistrationView = Backbone.View.extend({

  el: 'body',

  events: {
    'submit .js-authentication-form' : '_authenticate',
    'submit .js-signup-form' : '_signup'
  },

  initialize: function() {
    delete localStorage.token;
    delete localStorage.fullname;
    console.log('registration view initialized');
  },

  _authenticate: function(e) {
    e.preventDefault();

    var user = {
      username : this.$('input[name=username]').val(),
      password : this.$('input[name=password]').val()
    };

    this._submitForm(user, '/api/authenticate');

  },

  _signup: function(e) {
    e.preventDefault()

    var user = {
      username : this.$('input[name=username]').val(),
      password : this.$('input[name=password]').val(),
      fullname : this.$('input[name=fullname]').val()
    };

    this._submitForm(user, '/api/signup');
  },

  _submitForm: function(profile, path) {
    $.ajax({
      type: 'POST',
      url: path,
      data: profile,
      success: function(data) {
        localStorage.token = data.token;
        localStorage.fullname = data.fullname;
        window.location = '/';
      },
      error: function(resp) {
        delete localStorage.token;
        delete localStorage.fullname;
        
        this.$('div.errors').empty();
        
        _.each(resp.responseJSON, function(error){
          this.$('div.errors').append("<div class='error'>"+error.message+"</div>")
        },this)

        console.log('Error - There was an error while trying to connect with the server');
        console.log(resp.statusText);
      }.bind(this)
     });
  },

});

module.exports =  RegistrationView;