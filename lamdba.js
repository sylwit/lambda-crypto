'use strict';
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = process.env.PASSWORD, 
    result = '';


exports.handler = function(event, context) {
    var text = event.message || '';
    console.log((event.encode ? 'En' : 'De') + "crypting: " + text);
    
    if (event.encode){
      var cipher = crypto.createCipher(algorithm,password);
      result = cipher.update(text,'utf8','hex');
      result += cipher.final('hex');
    }
    else {
      var decipher = crypto.createDecipher(algorithm,password);
      result = decipher.update(text,'hex','utf8');
      result += decipher.final('utf8');
    }

// 	console.log("Result: " + result);
	context.succeed(result);
};

