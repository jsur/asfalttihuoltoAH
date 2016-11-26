'use strict';

var mongoose = require('mongoose');

var jobSchema = new mongoose.Schema({
	name: String,
	amount: Number,
	reason: String
});

var model = mongoose.model('job', jobSchema);

module.exports = model;