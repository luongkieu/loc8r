var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
require('./app_api/models/db');
var uglifyJs = require("uglify-js");
var fs = require('fs');

var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index');
//var users = require('./app_server/routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');
var appClientFiles = {
  'app.js' : fs.readFileSync('app_client/app.js','utf8'),
  'home.controller.js' : fs.readFileSync('app_client/home/home.controller.js','utf8'),
  'about.controller.js' : fs.readFileSync('app_client/about/about.controller.js','utf8'),
  'locationDetail.controller.js' : fs.readFileSync('app_client/locationDetail/locationDetail.controller.js','utf8'),
  'reviewModal.controller.js' : fs.readFileSync('app_client/reviewModal/reviewModal.controller.js','utf8'),
  'geolocation.service.js' : fs.readFileSync('app_client/common/services/geolocation.service.js','utf8'),
  'loc8rData.service.js' : fs.readFileSync('app_client/common/services/loc8rData.service.js','utf8'),
  'formatDistance.filter.js' : fs.readFileSync('app_client/common/filters/formatDistance.filter.js','utf8'),
  'addHtmlLineBreaks.filter.js' : fs.readFileSync('app_client/common/filters/addHtmlLineBreaks.filter.js','utf8'),
  'ratingStars.directive.js' : fs.readFileSync('app_client/common/directives/ratingStars/ratingStars.directive.js','utf8'),
  'footerGeneric.directive.js' : fs.readFileSync('app_client/common/directives/footerGeneric/footerGeneric.directive.js','utf8'),
  'navigation.directive.js' : fs.readFileSync('app_client/common/directives/navigation/navigation.directive.js','utf8'),
  'pageHeader.directive.js' : fs.readFileSync('app_client/common/directives/pageHeader/pageHeader.directive.js','utf8')
};
var uglified = uglifyJs.minify(appClientFiles, { compress : false });
fs.writeFile('public/angular/loc8r.min.js', uglified.code, function (err){
    if(err) {
        console.log(err);
    } else {
        console.log('Script generated and saved: loc8r.min.js');
    }
});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'app_client')));

//app.use('/', routes);
app.use('/api', routesApi);
//app.use('/users', users);
app.use(function(req, res) {
  res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});

app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});


if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}


app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;
