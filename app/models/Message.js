 /*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;
var timestamps = require('mongoose-timestamp');


 var UserSchema = require('./User');

 // var userPlugin = require('mongoose-user')

/**
 * Message Schema
 */

//todo return the user of the message...
var MessageSchema = new Schema({
   messageContent : String,   //content of the message...
   messagePostTime : Number,  //posting time of the message...
   messageSenderId: {type: ObjectId , ref: 'Message'}, //sender...
   messageReceiverId: {type: ObjectId , ref: 'Message'}
   ,messageSender: String
   ,messageReceiver: String
   //receiver...
})

MessageSchema.plugin(timestamps);
/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

MessageSchema.method({

})

/**
 * Statics
 */

MessageSchema.static({

})

/**
 * Register
 */

mongoose.model('Message', MessageSchema)


module.exports = MessageSchema;