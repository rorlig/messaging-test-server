
/*!
 * Module dependencies
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId;
var DeviceSchema = require('./Device');

// var usserPlugin = require('mongoose-user')

/**
 * User schema
 */

var UserSchema = new Schema({
	phoneNumber: String,  //acts as id for the user...
	conversations: [{type: ObjectId , ref: 'Conversation'}], // events user has checked into...embedd it
	devices: [DeviceSchema]
})

/**
 * User plugin
 */

// UserSchema.plugin(userPlugin, {})

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

UserSchema.method({
	sayHelloInstance: function() {
		console.log('sayHelloInstance');
	}

})

/**
 * Statics
 */

UserSchema.static({
	sayHello: function() {
		console.log('sayHello');
	}

})

/**
 * Register
 */

mongoose.model('User', UserSchema)
module.exports = UserSchema;
