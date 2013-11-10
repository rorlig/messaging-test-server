/*
*  Utility class to wrap the response
*/

var responseUtils = (function(){


	function ResponseUtils() {

	}

	ResponseUtils.prototype.get = function(responseCode, responseValue, responseType, isError){
		var responseObj={};
		responseObj.responseCode = responseCode;
		responseObj.responseValue = responseValue;
		responseObj.responseType = responseType;
		responseObj.isError = isError;
		return responseObj;
	}

	return ResponseUtils;


})();

module.exports = responseUtils;