 

var winston = require('winston');


/** Define AppLogger **/
var AppLogger = new (winston.Logger)({

	transports: [
		new (winston.transports.Console)({ json: false, 
										   timestamp: true,  
										   colorize: true 
										}),
		new winston.transports.File({ filename: 'logs/debug.log',
									  json: false,  
									  maxSize: 100000000,
									  maxFiles: 10

									})
	],
	exceptionHandlers: [
		new (winston.transports.Console)({ json: false, timestamp: true }),
		new winston.transports.File({ filename: 'logs/exception.log',
									  json: false,
									  maxSize: 100000000,
									  maxFiles: 10 
									})
	],
	exitOnError: false
});

/** Expose **/
module.exports = AppLogger;