/*
*  User Controller class... 
*  Allows adding users , accounts, relogin... 
*/
var mongoose = require('mongoose');
var AppLogger = require('../common/AppLogger');
var User = mongoose.model('User');
//var Event = mongoose.model('Event');
//var Account = mongoose.model('Account');
var Device = mongoose.model('Device');
var EmailHelper = require('../helpers/EmailHelper');

var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();



var userController = (function() {


	function UserController(){
		AppLogger.info('Enter UserController constructor');
		this.emailHelper = new EmailHelper();
	}

 	UserController.prototype.get = function(req, res){
	    var response = responseUtils.get(200, req.sender, 'User', false);
	    res.send(response);
 	}

 	//todo use promise.js instead of this structure - the callbacks are messy...
 	UserController.prototype.post = function(req, res){
 		console.log('user_controller: post call');
	    console.log('user controller request body ' + JSON.stringify(req.body));
 		//1. If userId is missing, check if the accounts information matches.. 
// 		var validationResp = UserController.validatePostParams(req);
// 		console.log('validationResp : '  + validationResp);
 		var self = this;

        var phoneNumber = req.body.phoneNumber;

        if (phoneNumber===undefined){
	        var response = responseUtils.get(666, 'phoneNumber is missing in the request', 'Error', false);
	        res.send(response);
        } else {
	        User.findOne({"phoneNumber": phoneNumber}).exec(function(err, user){
		        if (!user){
			         AppLogger.info("creating new user");
					 user = new User({"phoneNumber": phoneNumber});
			         user.save();
		        }
		        var response = responseUtils.get(200, user , 'User', false);
		        res.send(response);



	        })
        }


 	}

 	UserController.prototype.addDevice = function(req, res) {
 		console.log('UserController::addDevice');
 		var userId = req.header('UserId');
 		console.log('request body ' + JSON.stringify(req.body));
 		var deviceRegistrationId = req.body.deviceRegistrationId;
 		User.findOne({"_id": userId, "devices.deviceRegistrationId": deviceRegistrationId}).exec(function(err, user) {
 			 if (user) {
 			 	console.log('contains device - do nothing ');
			    var response = responseUtils.get(666, 'Device Already Registered', 'Error', false);
			    res.send(response);
 			 } else {
 			 	console.log('user not found in the db  ' + user);
 			 	userObj = req.user;
 			 	deviceObj = new Device(req.body);
 			 	userObj.devices.addToSet(deviceObj);
 			 	userObj.save();
			    var response = responseUtils.get(200, userObj, 'User', false);
			    res.send(response);
 			 }
 			 if (err)  {
			     var response = responseUtils.get(666, 'Unexpected issue in User collection', 'Error', false);
			     res.send(response);
		     }
 		});
 	}

 	UserController.prototype.updateDevice = function(req, res) {
 		console.log('UserController::updateDevice');
		var userId = req.header('UserId');
 		// console.log('request body ' + JSON.stringify(req.body));
 		var deviceId = req.params.deviceId;
 		var newDeviceRegistrationId = req.body.deviceRegistrationId;

 		console.log('deviceId: ' + deviceId);

 		User.findOne({"_id": userId}).exec(function(err, user) {
 			 if (user) {
 			 	// var device = user.devices.
 			 	var device = user.devices.id(deviceId);
 			 	console.log('contains device  ' + JSON.stringify(device));
 			 	device.deviceRegistrationId  = newDeviceRegistrationId;
 			 	user.save();
			    var response = responseUtils.get(200, userObj, 'User', false);
			    res.send(response);
 			 } else {
 			 	console.log('the old registeration id not found');
			    var response = responseUtils.get(666, 'Previously Registered Device Not Found', 'Error', false);
			    res.send(response);
 			 }
 			 if (err) {
			     var response = responseUtils.get(666, 'Unexpected issue in User Collection', 'Error', false);
			     res.send(response);
		     }
 		});
 	}

 	UserController.prototype.removeDevice = function(req, res) {
 		console.log('UserController::removeDevice');
		var userId = req.header('UserId');
 		// console.log('request body ' + JSON.stringify(req.body));
 		var deviceId = req.params.deviceId;
 		// var newDeviceRegistrationId = req.body.deviceRegistrationId;

 		console.log('deviceId: ' + deviceId);

 		User.findOne({"_id": userId}).exec(function(err, user) {
 			 if (user) {
 			 	var device = user.devices.id(deviceId);
 			 	if (device) device.remove();
 			 	user.save();
			    var response = responseUtils.get(200, userObj, 'User', false);
			    res.send(response);
 			 } else {
 			 	console.log('the device id not found');
			    var response = responseUtils.get(666, 'Previously Registered Device Not Found', 'Error', false);
			    res.send(response);
 			 }
 			 if (err) {
			     var response = responseUtils.get(666, 'Unexpected issue in User Collection', 'Error', false);
			     res.send(response);
		     }
 		});
 	}

 	UserController.prototype.getUserEvents = function(req, res) {
 		//todo get events 
 	}

 	



 	//todo check how to validate proper json? 
 	UserController.validatePostParams = function(req) {
 		console.log('user_controller:validatePostParams: ' + JSON.stringify(req.body));
 		if (req.body===undefined || req.body === "" || JSON.stringify(req.body) === "{}") {
 			console.log('user_controller:body is undefined or blank')
 			return {
 				errors: [{code: 666, message: 'Body Missing from the post request'}]
 			}
 		} else  {
// 			 req.checkBody('account', 'Parameter account missing').notEmpty();
 			 req.checkBody('network', 'Parameter account missing').notEmpty();
 			 req.checkBody('networkId', 'Parameter account.networkId missing').notEmpty();
 			 req.checkBody('networkId', 'Parameter account.networkId should be a number').isNumeric();
 			 req.checkBody('accessToken', 'Parameter account.accessToken missing').notEmpty();
 			 req.checkBody('accessTokenExpiration', 'Parameter account.accessTokenExpiration missing').notEmpty()
 			 req.checkBody('accessTokenExpiration', 'Parameter account.accessTokenExpiration should be a number').isNumeric();
			 req.checkBody('accessTokenExpiration', 'Parameter account.network').isNumeric();
 			 req.checkBody('firstName', 'Parameter account.firstName missing').notEmpty();
			 req.checkBody('lastName', 'Parameter account.lastName missing').notEmpty();
 			 var errors = req.validationErrors();
 			 console.log('errors: ' + JSON.stringify(errors));
 			 return {
 			 	errors: errors
 			 }
 		} 


 	};

 	UserController.containsDevice = function(devices, deviceRegistrationId){
 		console.log('UserController::containsDevice devices: ' + JSON.stringify(devices) + 
 					" deviceRegistrationId: " + deviceRegistrationId);
 		var strDeviceRegistrationId = "" + deviceRegistrationId;
 		for (var i = 0; i < devices.length; i++) {
 			console.log(' device id :' + JSON.stringify(devices[i].deviceRegistrationId)); 
 			if (devices[i].deviceRegistrationId === strDeviceRegistrationId) {
 				console.log('id matched');
 				return true;
 			}
 		}

			return false;		   
		
 	}

 	UserController.containsAccount = function(accounts, newAccount){
 		console.log('UserController::containsAccount accounts: ' + JSON.stringify(accounts) + 
 					"\n newAccount: " + JSON.stringify(newAccount));
 		// var strDeviceRegistrationId = "" + deviceRegistrationId;
 		for (var i = 0; i < accounts.length; i++) {
 			// console.log(' device id :' + JSON.stringify(devices[i].deviceRegistrationId)); 
 			if (accounts[i].networkId === newAccount.networkId) {
 				console.log('id matched');
 				return true;
 			}
 		}

			return false;		   
		
 	}

 	UserController.prototype.notificationTest = function(req, res){
 		this.notificationHelper.testNotification();
 	}



	return UserController;

})()

module.exports = userController;

