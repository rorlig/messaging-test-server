onmessage = function(e) {
	    sys.debug('worker receives message' + JSON.stringify(e));
		console.log('received message ' + JSON.stringify(e));
   		postMessage({ test : 'this is a test' });
};

onclose = function() {
	    sys.debug('Worker shuttting down.');
};

// self.addEventListener('message', function(e) {
// 	console.log('message' + JSON.stringify(e));
// 	postMessage(e)
// });