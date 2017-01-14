'use strict'

const express = require('express');
const router = require('./router.js');
const parser = require('body-parser');
const pg = require('pg');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/views');

app.use('/', express.static(__dirname + '/public'));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json());

pg.defaults.ssl = false;
pg.connect(process.env.DATABASE_URL || 'postgresql://localhost:5432/asfalttihuolto', function(err, client) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client
    .query('select id from public."Jobs" order by id desc limit 1;')
    .on('row', function(row) {
      console.log(JSON.stringify(row));
    });
});

app.use('/', router);

app.listen(process.env.PORT || 3000, function() {
	console.log("The server is running on port 3000.");
});