/* 
 * HttpHelper class
 * Helper class to do http transactions.. 
 */ 
var https = require('https');


var AppLogger = require('../common/AppLogger');


var HttpHelper = (function() {

	/* 
	 * Constructor for HttpHelper
	 */ 

	function HttpHelper(){

		AppLogger.info('HttpHelper:constructor');

	}


	/*
	 * Http Helper method to make the get calls. 
	 * @param options - http get options for the request, 
	 * @param callback - callback function.
 	 * @returns the result in the callback method.
	*/
	HttpHelper.prototype.get = function(options, callback){
		AppLogger.info('received http get request url:  ' + options.host + " path: " + options.path);
		var buffer = ''; //this buffer will be populated with the chunks of the data received from facebook
	    var request = https.get(options, function(result){
		    AppLogger.info('received result');
	        result.setEncoding('utf8');
	        result.on('data', function(chunk){
	            buffer += chunk;
	        });

	        result.on('end', function(){
//		        AppLogger.info('data returned is ' + buffer);
	            callback(null, buffer);
	        });
	    });

	    request.on('error', function(e){
	        console.log('error from http request: ' + e.message);
	        callback(e.message, null);
	    });

    	request.end();
		
		

	}


	/*
	 * Http Helper method to make the post calls. 
	 * @param options - http get options for the request, 
	 * @param callback - callback function.
 	 * @returns the result in the callback method.
	*/
	HttpHelper.prototype.post = function(options, callback){
	}

	/*
	 * Http Helper method to make the delete calls. 
	 * @param options - http get options for the request, 
	 * @param callback - callback function.
 	 * @returns the result in the callback method.
	*/
	HttpHelper.prototype.delete = function(options, callback){
	}

	/*
	 * Http Helper method to make the put calls. 
	 * @param options - http get options for the request, 
	 * @param callback - callback function.
 	 * @returns the result in the callback method.
	*/
	HttpHelper.prototype.put = function(options, callback){
	}

	
	return HttpHelper;
})();


module.exports = HttpHelper;