var Backbone = require('backbone');
var $ = require('jquery');
var hbsTemplate = require('../../server/views/partials/report.hbs');

var ReportView = Backbone.View.extend({

  el: ".js-report-section",

  events: {
    "submit .js-report-form": "_weeklyReport"
  },

  render: function(model) {
    this.$el.html(hbsTemplate(model));
    return this;
  },

  _weeklyReport: function(e) {
    e.preventDefault();
    
    var param = {date: this.$('input[name=week]').val()};

    $.ajax({
      type: 'GET',
      url: "/api/times/report",
      data: param,
      context: this,
      headers: {Authorization: 'Bearer ' + localStorage.token},
      success: function(data) {
        var result = {};
        if(!isNaN(data.weeklySpeed) && !isNaN(data.weeklyDistance)){
          result = data;
        }else{
          result.error = 'No data available for that week';
        }
        
        this.render(result);

      },
      error: function(resp) {
        console.log('Error - There was an error while trying to connect with the server');
        console.log(resp.statusText);
      }

     });

  }

});

module.exports =  ReportView;