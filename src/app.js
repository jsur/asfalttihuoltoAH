'use strict'

const express = require('express');
const router = require('./router.js');
const parser = require('body-parser');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/', express.static(__dirname + '/public'));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

app.use('/', router);

app.listen(process.env.PORT || 3000, function() {
	console.log("The server is running on port 3000.");
});