
var should = require('should');
var request = require('supertest');
var assert = require('assert');
var Facebook = require('../app/social/Facebook');
var Linkedin = require('../app/social/Linkedin');
var GooglePlus = require('../app/social/GooglePlus');
var SNFactory = require('../app/social/SNFactory');


/*
 *  Testing Facebook APIs
 */

describe('Testing Facebook GetFriends Feature', function(){

  it('should get facebook friends', function(done){

	  var networkId = 712803027;
	  var accessToken = "CAAH4HLCJSMkBAPBlZCslhsyGsL8euEXeUGzKRdIPuY0lc8cAfc9ofVmM6GyAZCZBs0ym0B7gnfWWZBDQFux05EE5RUKGbd8CorDLZCOcSX5eZCuAzHzToXEa9Tdg8kCDDbVpv0697ksZA8T4Okkk6vbB0ZCBvqJntUgWn1ZAXtjUxZAQZDZD";

	  var facebookObject = SNFactory.GetInstance().getSNObject("Facebook", networkId, accessToken);

	  facebookObject.getFriends(function(err, response){
  		assert.equal(err, null);
	    assert.equal(response.error, null);
	    done();
	  });
  })

  it('should get facebook friends return errors on invalid id request', function(done){

	  var networkId = 71280302;
	  var accessToken = "CAAH4HLCJSMkBAPBlZCslhsyGsL8euEXeUGzKRdIPuY0lc8cAfc9ofVmM6GyAZCZBs0ym0B7gnfWWZBDQFux05EE5RUKGbd8CorDLZCOcSX5eZCuAzHzToXEa9Tdg8kCDDbVpv0697ksZA8T4Okkk6vbB0ZCBvqJntUgWn1ZAXtjUxZAQZDZD";
	  var facebookObject = SNFactory.GetInstance().getSNObject("Facebook", networkId, accessToken);

	  facebookObject.getFriends(function(err, response){
			console.log('error is ' + err);
			assert.equal(err, null);
		    assert.notEqual(JSON.parse(response).error, null);
			done();
		});
  })

  //todo expiration and invalid tokens testing..
})



/*
 *  Testing Linkedin APIs
*/

describe('Testing LinkedIn GetFriends Feature', function(){

		it('should get linkedin friends', function(done){
			var networkId = 'MQfLwmXgw3'
			var accessToken = "AQWXj9kRzL9ijWCbMRGKPt0DjhqdH8qFShTKqsnmfsBwdg0m7k1y14U4A-nwxp8d0fYr8FdSxu2ZEfGa0IzsuTm6B4Xh5LfRULgnrRNn0xJXoFa1ZDupejCEaiRD5pWgOTFT_4B8Ilz61yNddUsAMVSf1iBywjSdq98jt89y3rlUocBjyw0"
			var linkedinObject = SNFactory.GetInstance().getSNObject("Linkedin", networkId, accessToken);

			linkedinObject.getFriends(function(err, response){
				assert.equal(err, null);
				done();
			});
	  });


	it('should return error for invalid linkedin id in getFriends call', function(done){

		var networkId = 'MQfLwmXgw'
		var accessToken = "AQWXj9kRzL9ijWCbMRGKPt0DjhqdH8qFShTKqsnmfsBwdg0m7k1y14U4A-nwxp8d0fYr8FdSxu2ZEfGa0IzsuTm6B4Xh5LfRULgnrRNn0xJXoFa1ZDupejCEaiRD5pWgOTFT_4B8Ilz61yNddUsAMVSf1iBywjSdq98jt89y3rlUocBjyw0"
		var linkedinObject = SNFactory.GetInstance().getSNObject("Linkedin", networkId, accessToken);


		linkedinObject.getFriends(function(err, response){
			assert.equal(err, null);
			assert.equal(JSON.parse(response).status, 404);
			done();
		});
	});



})

/*
 *  Testing Google+ APIs
 */

describe('Testing Google+ GetFriends Feature', function(){

	it('should get return error on invalid or expired token', function(done){
		var accessToken = "ya29.AHES6ZShndYUz8wKSogfr6SOU0O81lKunftTZDNzKqAvswGG";
		var networkId = "107581609974834715185";
		var gplusObject = SNFactory.GetInstance().getSNObject("GooglePlus", networkId, accessToken);
		gplusObject.getFriends(function(err, response){
			assert.notEqual(JSON.parse(response).error, null);
			assert.equal(JSON.parse(response).error.message, "Invalid Credentials");
			assert.equal(JSON.parse(response).error.code, 401);

			done();
		});
	});


	it('should get return google+ friends with valid id and token', function(done){
		var accessToken = "ya29.AHES6ZShndYUz8wKSogfr6SOU0O81lKunftTZDNzKqAvswGG";
		var networkId = "107581609974834715185";
		var gplusObject = SNFactory.GetInstance().getSNObject("GooglePlus", networkId, accessToken);
		gplusObject.getFriends(function(err, response){
			assert.equal(JSON.parse(response).error, null);
			done();
		});
	});




})
