var _ = require('underscore');
var glob = require('glob');
var hbs = require('hbs');
var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var flash = require('connect-flash');
var webApp = module.exports = express();
var routesPath = __dirname + '/server/routes/';

initStylus();
initHandlebars();
webApp.use(express.static(__dirname + '/static'));
webApp.use(express.urlencoded());
webApp.use(flash());

//Initializing WebApp Routes
//(Dynamically loading all entry points
//in all the .JS files inside routes folder)
_.each(glob.sync(routesPath + '*.js'), function(file) {
  var route = file.substr(0, file.indexOf('.'));
  console.log('Adding WebApp route:' + route);
  require(route)(webApp);
});

function initStylus() {
  function compile(str, path) {
    return stylus(str)
      .set('filename', path)
      .set('linenos', true)
      .use(nib());
  };

  webApp.use(stylus.middleware({
    src: __dirname + '/styles',
    dest: __dirname + '/static',
    compile: compile
  }));
};

function initHandlebars() {
  hbs.registerPartials(__dirname + '/server/views/partials');
  webApp.engine('html', hbs.__express);

  webApp.set('view engine', 'hbs');
  webApp.set('views', __dirname + '/server/views');
};
