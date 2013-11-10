/**
 * Created by admin on 11/9/13.
 */


/*!
 * Module dependencies
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = mongoose.Schema.Types.ObjectId;

var UserSchema = require('./User');
var MessageSchema = require('./Message');
var timestamps = require('mongoose-timestamp');

// var userPlugin = require('mongoose-user')

/**
 * Conversation Schema
 */

var ConversationSchema = new Schema({
	messages: [MessageSchema]  // array of messages
	,participants: [UserSchema]  //array of users...
//	,owner: UserSchema //owner of the conversation..?
})


ConversationSchema.plugin(timestamps);
/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

ConversationSchema.method({

})

/**
 * Statics
 */

ConversationSchema.static({

})

/**
 * Register
 */

mongoose.model('Conversation', ConversationSchema)


module.exports = ConversationSchema;