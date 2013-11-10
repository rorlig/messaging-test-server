/*
 *  Message Controller class...
 */
var mongoose = require('mongoose')
var User = mongoose.model('User');
var Message = mongoose.model('Message');

var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();
var AppLogger = require('../common/AppLogger');


var messageController = (function() {


	function MessageController(){

	}

	MessageController.prototype.get = function(req, res){
		//returns comments for the user

	}

	//MessageController use promise.js instead of this structure - the callbacks are messy...
	MessageController.prototype.post = function(req, res){


		var receiverNumber = req.body.receiverNumber;

		if (receiverNumber===undefined){
			var response = responseUtils.get(666, 'Receiver Number is missing in the request body', 'Error', false);
			res.send(response);
		} else {

			User.findOne({"phoneNumber": receiverNumber}).exec(function(err, user){
				if (user){
					AppLogger.info("creating message object" + " sender : " + req.sender._id + " receiver: " + user._id);
					var message = new Message({
						"messageContent": req.body.messageContent,
						"messageSender": req.sender._id,
						"messageReceiver": user._id
					})

					message.save(function(err){
						var response = responseUtils.get(200, message, 'Message', false);
						res.send(response);

					});


				}   else {
					var response = responseUtils.get(666, 'Receiver Number not found in the db', 'Error', false);
					res.send(response);
				}
			})
		}

	}


	//todo use promise.js instead of this structure - the callbacks are messy...
	MessageController.prototype.delete = function(req, res){
		// deletes the comment...
	}


	//todo use promise.js instead of this structure - the callbacks are messy...
	MessageController.prototype.edit = function(req, res){
		// edits the comment...
	}

	//todo check how to validate proper json?
	MessageController.validatePostParams = function(req) {



	};



	return MessageController;

})()

module.exports = messageController;

// exports.index = function (req, res) {
//   res.send({code:200})
// }
