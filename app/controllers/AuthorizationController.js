/**
 * AuthorizationController controller class
 * Checks if the user is authorized to see the content...
 */

var mongoose = require('mongoose')
var User = mongoose.model('User');
//var Event = mongoose.model('Event');
var ObjectId = mongoose.Schema.Types.ObjectId;

var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();



	


var authorization_controller = (function() {
	
	/**
	 * Authorization Controller actions.
	 * @param app
	 */
	function AuthorizationController(){

	}


	//assigns the role for a user to a particular event 
	//roles are checkedInUser or notCheckedInUser  
	AuthorizationController.prototype.isAuthorized = function (req,res,next) {

		next();
//	   console.log('info', 'AuthorizationController:isAuthorized eventId ' + req.params.eventId +
//	   	" userId: "  + req.header('UserId'));
//	   var eventId = "" + req.params.eventId;
//	   var userId = "" + req.header('UserId');
//	   // var query = '"_id" +  ObjectId(eventId), "user._id": ObjectId(req.header('UserId'));'
//	   // console.log('query : ' + query);
//	   Event.findOne({"_id": eventId, "user._id": userId},function(err, event) {
//
//	   		console.log('event is ' + JSON.stringify(event));
//		   	if (event && event!=null ) {
//		   		req.user_role = "CheckedInUser";
//		   		next();
//		   	} else {
//		   		req.user_role = "NotCheckedInUser";
//		   		next();
//		   	}
//
//		   	if (err) {
//			    var response = responseUtils.get(666, 'Unexpected issue in Event collection', 'Error', true);
//			    res.send(response);
//		   	}
//	   });
	}

	   
	

	return AuthorizationController;

})();

module.exports = authorization_controller;



