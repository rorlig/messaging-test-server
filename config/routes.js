
/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
//var passportOptions = {
//  failureFlash: 'Invalid email or password.',
//  failureRedirect: '/login'
//}

// controllers
var userController =  new (require('../app/controllers/UserController'))();
var authenticationController = new (require('../app/controllers/AuthenticationController'))();
var authorizationController = new (require('../app/controllers/AuthorizationController'))();
var commentController = new (require('../app/controllers/CommentController'))();

var messageController = new (require('../app/controllers/MessageController'))();

var conversationController = new (require('../app/controllers/ConversationController'))();


var testController = new (require('../app/controllers/TestController'))();

var AppLogger = require('../app/common/AppLogger');


/**
 * Expose
 */

module.exports = function (app) {

  app.get('/api/v1/user',
  			authenticationController.isAuthenticated, 
  			function(req,res){
    userController.get(req,res);
  });

 /** for notification testing purposes only **/
  app.get('/api/v1/user/test', 
        function(req,res){
    console.log('UserController testing notifications');
	userController.notificationTest(req,res);
  });


  /** adding a new user or relogin **/
  app.post('/api/v1/user', function(req,res){
  	userController.post(req,res);
  });

  /** adding a new device **/
  app.post('/api/v1/device',
	  authenticationController.isAuthenticated,
	  function(req,res) {
    console.log('the body of the request to add device' + JSON.stringify(req.body));
  	userController.addDevice(req, res);
  });

  /** updating an old device id with new device id **/
  app.put('/api/v1/device/:deviceId'
	  , authenticationController.isAuthenticated
	  , authorizationController.isAuthorized
	  , function(req, res) {
  	userController.updateDevice(req, res);
  })

   /** deleting an old device id **/
  app.delete('/api/v1/device/:deviceId'
	  ,authenticationController.isAuthenticated
	  , authorizationController.isAuthorized
	  , function(req, res) {
  	userController.removeDevice(req, res)
  })



	app.post('/api/v1/message',
		authenticationController.isAuthenticated,
//		authorizationController.isAuthorized,
		function(req,res){
			messageController.post(req,res);
    });

//  /** post a comment to the event message board **/
//  app.post('/api/v1/event/:eventId/comment',
//        authenticationController.isAuthenticated,
//        authorizationController.isAuthorized, function(req,res){
//      commentController.post(req,res);
//  });

  /** new conversation **/

  /* get conversations for the user */
  app.get('/api/v1/conversation'
      ,authenticationController.isAuthenticated
	  ,function(req, res){
		  conversationController.get(req,res);

	  }
  );

	/* get conversations for the user */
	app.get('/api/v1/conversation/:conversationId'
		,authenticationController.isAuthenticated
		,function(req, res){
			conversationController.getConversation(req,res);

		}
	);

  /* post conversation */
  app.post('/api/v1/conversation'
	  ,authenticationController.isAuthenticated
	  ,function(req,res){

	   AppLogger.info('posting new conversations');
	   conversationController.post(req,res);
	  }
  );

  /* post new message to the conversation */
  app.post('/api/v1/conversation/:conversationId/message'
	  ,authenticationController.isAuthenticated
	  ,authorizationController.isAuthorized
	  ,function(req,res){

		  conversationController.addMessage(req,res);

	  }
  );


//  /** facebook realtime api **/
//  app.get('/api/v1/callback', function(req,res){
//	 console.log(req.query["hub.challenge"]);
//	 res.send(req.query["hub.challenge"]);
//  });







}


