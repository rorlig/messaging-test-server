/*
 * Helper class to handle notifications to Android Devices...
 */


var gcm = require('node-gcm');
var env = process.env.NODE_ENV || 'development'
var config = require('../../config/config')[env];
var _ = require('underscore');
var regId = 'APA91bHzmQe6Hl9-gut-hPy-ANh1kZR7O0sB-fe-oIuZ5luOuLfR1LH_qgG9zkeIl1LtAEQzwZfR3Dw3CwA-k10A7Myi96xM7UiKd0fjLmzQVK6oe_CbaTes1VusOzmadnMDn3yuR4kUwac3iw2Db23Ye07Z2M-GPg';

//onmessage = function(e) {
//		console.log('received message ' + JSON.stringify(e));
//   		postMessage({ test : 'this is a test' });
//};
//
//onclose = function() {
//	    sys.debug('Worker shuttting down.');
//};
var notificationHelper = (function() {

	/* 
	 * Constructor for NotificationHelper
	 */ 

	function NotificationHelper(){
		this.sender = new gcm.Sender(config.gcm.serverAccessKey);
	}

//	NotificationHelper.prototype.onmessage = function(e) {
//		console.log('received message ' + JSON.stringify(e));
//   		postMessage({ test : 'this is a test' });
//	};

//	NotificationHelper.prototype.onclose = function() {
//	    sys.debug('Worker shuttting down.');
//	};
	/*
	 * Test method
	*/
	NotificationHelper.prototype.sayHello = function(){
		console.log('NotificationHelper sayHello()');
	} 
	/* 
	 *  Notification to the user when someone checks into the same event as the user...
	 */
	NotificationHelper.prototype.sendMessageNotification = function(users, sender){

		_.each(users, function(user){
			console.log('sending notification to user: ' + JSON.stringify(user.email));
			console.log('devices: ' + JSON.stringify(user.devices));
			console.log('user id: ' + user._id);
			var message = new gcm.Message({
				collapseKey: 'demo',
				delayWhileIdle: true,
				timeToLive: 3,
				data: {
					key1: 'message1',
					key2: 'message2'
				}
			});
			var sender = new gcm.Sender(config.gcm.serverAccessKey);
			var registrationIds = [];
			if (user._id !== newUser._id) {
				_.each(user.devices, function(device){
					//send notification to each device..
					console.log(
						' device: ' + device.deviceRegistrationId);

					registrationIds.push(device.deviceRegistrationId);


					//todo actual notification ..
					//exclude the current user ...
	 			})
			}
			sender.send(message, registrationIds, 4, function (err, result) {
				console.log(result);
				console.log(" " + err);

			});
		})
		// callback('done');

	}

	/*
	 * Notification when someone comments on message board of an event user is checked into  
	*/
	NotificationHelper.prototype.commentNotification = function(toNotification){
		

	}

	/* 
	 * Notification when someone sends a direct message to you 
	*/

	NotificationHelper.prototype.directMessageNotification = function(){

	}

	/* 
	 *  Notification when a social network friend joins.
	 */  
	
	NotificationHelper.prototype.friendJoinNotification = function(){

	}
	
	/* 
	 *  For testing purposes...
	 */
	NotificationHelper.prototype.testNotification = function(){
		//notification message....
		// console.log('testing notifications');
		var message = new gcm.Message({
		    collapseKey: 'demo',
		    delayWhileIdle: true,
		    timeToLive: 3,
		    data: {
		        key1: 'message1',
		        key2: 'message2'
		    }
		});
// 07-17 03:21:34.957: VERBOSE/GCMDemo(4360): Posting 'regId=APA91bG_Inl3tB_gg45Iopm71-mhGvpbeyPdGS7MF2w8_OGIwuy0ewZPaDmNySakdj27q0MmF620mTloTK6TTfWPYehjjSyCaVvL3Sfx05_xfsEtFsROARhVTBDxDTg5WVdwnAEkP0wAhmLEtVaj0NxrQaJ40QZ4sgAPA91bG_Inl3tB_gg45Iopm71-mhGvpbeyPdGS7MF2w8_OGIwuy0ewZPaDmNySakdj27q0MmF620mTloTK6TTfWPYehjjSyCaVvL3Sfx05_xfsEtFsROARhVTBDxDTg5WVdwnAEkP0wAhmLEtVaj0NxrQaJ40QZ4sg' to http://127.0.0.1:8080/register
		// console.log('creating notification sender object')
		var sender = new gcm.Sender(config.gcm.serverAccessKey);
		var registrationIds = [];
		//get value from device...
		registrationIds.push(regId);

		// console.log('sending notification message object')

		/**
		 * Parameters: message-literal, registrationIds-array, No. of retries, callback-function
		 */
		sender.send(message, registrationIds, 4, function (err, result) {
		    console.log(result);
		    console.log(" " + err);

		});

	}
	
	

	return NotificationHelper;
})();


module.exports = notificationHelper;