'use strict';

var mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/jobs', function(err) {
	if(err) {
		console.log('Failed connecting to MongoDB!');
	} else {
		console.log('Successfully connected to MongoDB.');
	}
});