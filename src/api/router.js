'use strict';

const express = require('express');
const router = express.Router();
const dataservice = require('./dataservice.js')
const _ = require('lodash');
const Kaljasakko = require('../models/kaljasakko_collection.js');
const errormessage = "<h1>Server error occurred. Please come again.</h1>"

//GET

router.get('/', function(req, res) { 
    Kaljasakko.collection.find().toArray(function(err, items) {
        res.render('summary', { items: items }); 
        })
    });

router.get('/tilaukset', function(req, res) { 
    Kaljasakko.collection.find().toArray(function(err, items) {
        res.render('orders', { items: items }); 
        })
    });

//POST

router.post('/', function(req, res) {
    var kaljasakko = req.body;
    Kaljasakko.create(kaljasakko, function(err, kaljasakko) {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        console.log("Sakko created.");
        res.send(kaljasakko._id);
        })
    });


module.exports = router;
