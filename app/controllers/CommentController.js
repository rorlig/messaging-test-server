/*
*  Comment Controller class... 
*/
var mongoose = require('mongoose')
var User = mongoose.model('User');
//var Account = mongoose.model('Account');
//var Event = mongoose.model('Event');
//var Comment = mongoose.model('Comment');

var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();


var commentController = (function() {


	function CommentController(){

	}

 	CommentController.prototype.get = function(req, res){
 		//returns comments for the user 
 		
 	}

 	//todo use promise.js instead of this structure - the callbacks are messy...
 	CommentController.prototype.post = function(req, res){

 		if (req.user_role === 'NotCheckedIn') {
		    var response = responseUtils.get(666, 'You must be checkedIn to the event to post', 'Error', false);
		    res.send(response);
 		} else {
 			//role == checkedIn
//// 			Event.findOne({'_id': req.params.eventId}).populate('user').exec(function(err, event) {
//// 				if (event) {
//// 					console.log('adding comment to the event' + JSON.stringify(event));
//// 					commentObj = new Comment(req.body);
//// 					event.comments.addToSet(commentObj);
//// 					event.save();
////				    var response = responseUtils.get(200, commentObj, 'Message', false);
////				    res.send(response);
////// 					res.send(event);
//// 				} else {
////				    var response = responseUtils.get(666, 'Unexpected Error in Event Collection', 'Error', false);
////				    res.send(response);
////
//// 				}
////
//// 				if (err) {
////
////				    var response = responseUtils.get(666, 'Unexpected Error in Event Collection', 'Error', false);
////				    res.send(response);
////
////			    }
////
//
// 			})
 		}
 		// adds a comment to the event.. 
 		// console.log('user role ' + req.user_role);
 		// based on the role allow the comment to be seen or not.. 
 		// res.send({code: 200, role: req.user_role})
 		// check if event exists.. 
 	}


 	//todo use promise.js instead of this structure - the callbacks are messy...
 	CommentController.prototype.delete = function(req, res){
 		// deletes the comment...  
 	}


 	//todo use promise.js instead of this structure - the callbacks are messy...
 	CommentController.prototype.edit = function(req, res){
 		// edits the comment... 
 	}

 	//todo check how to validate proper json? 
 	CommentController.validatePostParams = function(req) {
 		


 	};



	return CommentController;

})()

module.exports = commentController;

// exports.index = function (req, res) {
//   res.send({code:200})
// }
