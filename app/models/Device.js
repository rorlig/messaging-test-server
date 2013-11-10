
/*!
 * Module dependencies
 */

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var ObjectId = mongoose.Schema.Types.ObjectId;


/**
 * User schema
 */

var DeviceSchema = new Schema({
	deviceRegistrationId: String,
	deviceOSType: String
});


/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */

DeviceSchema.method({
	

})

/**
 * Statics
 */

DeviceSchema.static({
	

})

/**
 * Register
 */

mongoose.model('Device', DeviceSchema)
module.exports = DeviceSchema;
