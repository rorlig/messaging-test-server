/**
 * Authentication controller class
 * Checks if the user is authenticated to see the content...
 */

var mongoose = require('mongoose')
var User = mongoose.model('User');
//var Event = mongoose.model('Event');
var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();
//var responseUtil

var AppLogger = require('../common/AppLogger');

	


var authentication_controller = (function() {
	
	/**
	 * Authorization Controller actions.
	 */
	function AuthenticationController(){

	}


	
	AuthenticationController.prototype.isAuthenticated = function (req,res,next) {


		var senderNumber = req.header('senderNumber');
		User.findOne({"phoneNumber": senderNumber}).exec(function(err, user){
			if (user){
				AppLogger.info("sending user : " + JSON.stringify(user));
				req.sender = user;
				next();
			} else {
				var response = responseUtils.get(666, 'User is not registered', 'Error', true);
				res.send(JSON.stringify(response))
			}

		})
//		console.log('info', 'AuthenticationController:isAuthenticated');
//		var userId = req.header('UserId');
//		console.log("userId in the header: " + userId);
//		if (userId===undefined) {
//
//		    var response = responseUtils.get(401, 'UserId missing in the request', 'Error', true);
//			res.send(JSON.stringify(response))
//		}   else {
//			// next();
//			// User.sayHello();
//			User.findById("" + userId).populate('events').exec(function(err, user){
//				if (user) {
//					var events = user.events;
//
//					//populate the other users at the event or not? - or have an extra rest call to get event details..
//					Event.populate(events, {
//						path:'users',
//						select:'_id accounts',
//						match: {_id : {$ne: user._id}} //don't return the current user..
//					}, function() {
//						console.log("user found");
//						console.log()
//						req.user = user;
//						next();
//					})
//
//
//				} else {
//					var response = responseUtils.get(401, 'UserId Not Found in the Database', 'Error', true);
//					res.send(response);
//				}
//			})
//
//		}

	}

	return AuthenticationController;

})();

module.exports = authentication_controller;



