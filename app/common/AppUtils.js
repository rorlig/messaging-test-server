/**
 * Created with IntelliJ IDEA.
 * User: admin
 * Date: 8/7/13
 * Time: 4:42 PM
 * To change this template use File | Settings | File Templates.
 */


var appUtils = (function(){


	function AppUtils() {

	}

	AppUtils.prototype.serialize = function(obj) {
		console.log('AppUtils:serialize');
		var str = [];
		for(var p in obj)
			str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		return str.join("&");
	}
	return AppUtils;


})();

module.exports = appUtils;