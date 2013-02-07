var _ = require('underscore');
var util = require('util');
var path = require('path');
var fs = require('fs');
var _DEBUG = false;

/* ************************************
 * 
 * ************************************ */

/* ******* CLOSURE ********* */

/* ********* EXPORTS ******** */

fs.readdir(__dirname, function(err, files){
	_.each(_.reject(files, function(f){
		return f == 'index.js'
	}),

		function(f){
			require('./' + f);
		}
	)
});