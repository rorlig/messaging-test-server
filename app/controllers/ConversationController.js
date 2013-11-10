/*
 *  Conversation Controller class...
 */
var mongoose = require('mongoose')
var User = mongoose.model('User');
var Conversation = mongoose.model('Conversation');

var Message = mongoose.model('Message');

var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();
var AppLogger = require('../common/AppLogger');


var conversationController = (function() {


	function ConversationController(){

	}

	ConversationController.prototype.get = function(req, res){
		//returns conversations for the user
		Conversation.find({}).exec(function(err, conversations){

		})

	}

	//ConversationController use promise.js instead of this structure - the callbacks are messy...

	// new conversations require the receiver name....
	// adding new messages require only the user sending the message...
	ConversationController.prototype.post = function(req, res){


		var receiverNumber = req.body.receiverNumber;

		if (receiverNumber===undefined){
			var response = responseUtils.get(666, 'Receiver Number is missing in the request body', 'Error', false);
			res.send(response);
		} else {

			User.findOne({"phoneNumber": receiverNumber}).exec(function(err, user){
				if (user){
					AppLogger.info("creating conversation object" + " sender : " + req.sender._id + " receiver: " + user._id);
					var conversation = new Conversation();
					conversation.save(function(err){
							if (!err){
								var message = new Message({
									"messageContent": req.body.messageContent
									,"messageSender": req.sender._id
									,"messageReceiver": user._id
								})
								message.save(function (err) {
								  conversation.messages.addToSet(message);
								  conversation.participants.addToSet(user);
								  conversation.participants.addToSet(req.sender);
									conversation.save(function(err){
										AppLogger.info("creating conversation object" + JSON.stringify(conversation));

										var response = responseUtils.get(200, conversation, 'Conversation', false);
										res.send(response);

									});
								})
							}
						}
					)






				}   else {
					var response = responseUtils.get(666, 'Receiver Number not found in the db', 'Error', false);
					res.send(response);
				}
			})
		}

	}


	ConversationController.prototype.addMessage = function(req, res){
		var receiverNumber = req.body.receiverNumber;

		if (receiverNumber===undefined){
			var response = responseUtils.get(666, 'Receiver Number is missing in the request body', 'Error', false);
			res.send(response);
		} else {
		   Conversation.findById(req.params.conversationId, function (err, conversation){
			   if (!err){
				   var message = new Message({
					   "messageContent": req.body.messageContent
					   ,"messageSender": req.sender._id
//					   ,"messageReceiver": user._id
				   })
				   message.save(function (err) {
					   conversation.messages.addToSet(message);
//					   conversation.participants.addToSet(user);
//					   conversation.participants.addToSet(req.sender);
					   conversation.save(function(err){
						   AppLogger.info("creating conversation object" + JSON.stringify(conversation));
						   var response = responseUtils.get(200, conversation, 'Conversation', false);
						   res.send(response);

					   });
				   })
			   }
		   })
		}

	}

	//todo use promise.js instead of this structure - the callbacks are messy...
	ConversationController.prototype.delete = function(req, res){
		// deletes the comment...
		//todo -- not required now..
	}


	//todo use promise.js instead of this structure - the callbacks are messy...
	ConversationController.prototype.edit = function(req, res){
		// edits the comment...
		//todo -- not required now...
	}

	//todo check how to validate proper json?
	ConversationController.validatePostParams = function(req) {
	  //todo -- not required now...
	};



	return ConversationController;

})()

module.exports = conversationController;

// exports.index = function (req, res) {
//   res.send({code:200})
// }