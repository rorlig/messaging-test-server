
/**
 * Module dependencies
 */

var express = require('express')
var passport = require('passport')
var env = process.env.NODE_ENV || 'development'
var config = require('./config/config')[env]
var mongoose = require('mongoose')
var fs = require('fs')
var AppLogger = require('./app/common/AppLogger');

require('express-namespace')

//connecting to the mongoose
AppLogger.log('info', 'Connecting to the mongoose db');
mongoose.connect(config.db)

// Bootstrap models
fs.readdirSync(__dirname + '/app/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(__dirname + '/app/models/' + file)
})

// Bootstrap passport config
// require('./config/passport')(passport, config)

var app = express()

// Bootstrap application settings
require('./config/express')(app, config)

// Bootstrap routes
require('./config/routes')(app)

// Start the app by listening on <port>
var port = process.env.PORT || 8000
app.listen(port)


AppLogger.log('info', 'Express app started on port '+port);

// Expose app
module.exports = app
