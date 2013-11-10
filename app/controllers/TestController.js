/**
 * Test controller class
 */



//var Facebook = require('../social/Facebook');
//var Linkedin = require('../social/Linkedin');
//var GooglePlus = require('../social/GooglePlus');
//var SNFactory = require('../social/SNFactory');
//var ProviderFactory = require('../providers/ProviderFactory');
var _ = require('underscore');
var ResponseUtils  = require('../common/ResponseUtils');
var responseUtils = new ResponseUtils();




var testController = (function() {
	
	/**
	 * Test Controller actions.
	 */

	function TestController(){



	}


	TestController.prototype.getFBFriends = function (req,res,next) {
		var networkId = 712803027;
		var accessToken = "CAACEdEose0cBALnfRH9XZCR0lW40mbJsUb0NNJrFtH6myGKsFrCkhjvfQaZBAzgUBWyS2SaYXXMriC4MHlLDTYYtjzswhIgtfjtByiBMZAuVENX071qzzEsDiSyENJq5hguynbAP3W4wng6tQogHOUOZBSvBTl06IXXzhRimbAZDZD";

		var facebookObject = SNFactory.GetInstance().getSNObject("Facebook", networkId, accessToken);
		facebookObject.getFriends(function(err, friends){
			console.log('friends received : ' + friends);
			res.send(friends);
		});
//		res.send("");
	}

	TestController.prototype.getLinkedinFriends = function (req,res,next) {

		var networkId = 'MQfLwmXgw3'
		var accessToken = "AQWXj9kRzL9ijWCbMRGKPt0DjhqdH8qFShTKqsnmfsBwdg0m7k1y14U4A-nwxp8d0fYr8FdSxu2ZEfGa0IzsuTm6B4Xh5LfRULgnrRNn0xJXoFa1ZDupejCEaiRD5pWgOTFT_4B8Ilz61yNddUsAMVSf1iBywjSdq98jt89y3rlUocBjyw0"
		var linkedinObject = SNFactory.GetInstance().getSNObject("Linkedin", networkId, accessToken);

		linkedinObject.getFriends( function(err, friends){
			console.log('friends received : ' + friends);
			res.send(friends);
		});
//		res.send("");
	}

	TestController.prototype.getGooglePlusFriends = function (req,res,next) {


		var accessToken = "ya29.AHES6ZS3xrcVMkATiQxQoBDi73zmzDuEGcXoeGl2ku5flN2c ";
		var networkId = "107581609974834715185";
		var gplusObject = SNFactory.GetInstance().getSNObject("GooglePlus", networkId, accessToken);


		gplusObject.getFriends(function(err, friends){
			console.log('friends received : ' + friends);
			res.send(friends);
		});
//		res.send("");
	}


	TestController.prototype.getEventBrite = function (req,res,next) {


		console.log('TestController getEventBrite() params : ' + JSON.stringify(req.query));

		var eventBriteObject = ProviderFactory.GetInstance().getProviderObject("EventBrite", req.query);
//		assert.notEqual(eventBriteObject, null);

		eventBriteObject.getEvents(function(err, response){
			console.log('response received: ' + JSON.stringify(response) );
			var respJ = JSON.parse(response);
			var resp = responseUtils.get(200, respJ.events, 'Event', false);
			res.set('Content-Type', 'application/json');
			res.send(resp);
		});
//		var gplusObject = SNFactory.GetInstance().getSNObject("GooglePlus", networkId, accessToken);


//		gplusObject.getFriends(function(err, friends){
//			console.log('friends received : ' + friends);
//			res.send(friends);
//		});
//		res.send("");
	}








	return TestController;

})();

module.exports = testController;



