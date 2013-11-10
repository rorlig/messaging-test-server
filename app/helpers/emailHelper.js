/*
* Helper class to send out notifications via Amazon SES service 
*/
var nodemailer = require("nodemailer");
// var app = require('../../server');
var env = process.env.NODE_ENV || 'development'
var config = require('../../config/config')[env];
// var transport = nodemailer.createTransport("SES", {
//     AWSAccessKeyID: config.email.user,
//     AWSSecretKey: config.email.password,
//     ServiceUrl: config.email.host
// });




var emailHelper = (function() {

	/* 
	 * Constructor for emailHelper
	 */ 

	function EmailHelper(){
		this.transport = nodemailer.createTransport("SES", {
   			 AWSAccessKeyID: config.email.user,
   			 AWSSecretKey: config.email.password
		});
	}


	/*
	 * Sends welcome emails.  
	*/
	EmailHelper.prototype.sendWelcomeEmail = function(toEmail){
		console.log('sendWelcomeEmail to ' + toEmail);
		var message = {
			from: "Hello at Greet <guptgaurav@gmail.com>",
			to: toEmail,
			subject: "Welcome to Greet!",
			text: "Welcome to Greet - todo add the marketing text here"
		};

		// this.transport.sendMail(message, function(error){
		//     if(error){
		//         console.log('Error occured');
		//         console.log(error.message);
		//         return;
		//     }
  //   	   console.log('Message sent successfully!');
		// });

	}

	/* 
	 *  Sends invite emails from one user to another  
	 */

	EmailHelper.prototype.sendInviteEmail = function(){

	}

	/* 
	 *  Notification email such as stuff like adding a comment to event user is checked into 
	 */  
	
	EmailHelper.prototype.sendActivityEmail = function(){

	}
	
	/* 
	 *  Notification email if user has accepted an invite 
	 */
	EmailHelper.prototype.sendAcceptConfirmationEmail = function(){

	}
	
	/* 
	*  Email send to a user if a new private message is send to the user. 
	*/ 

	EmailHelper.prototype.sendNewMessageEmail = function(){

	}

	/* 
	* Marketing emails occasionally to all users..
	*/

	EmailHelper.prototype.sendMarkettingEmail = function() {

	}

	return EmailHelper;
})();


module.exports = emailHelper;