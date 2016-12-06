'use strict';

const express = require('express');
const router = express.Router();
const _ = require('lodash');
//const Job = require('../models/job_collection.js');
const errormessage = "<h1>Server error occurred. Please come again.</h1>"

//GET

router.get('/', function(req, res) { 
    //Job.collection.find().toArray(function(err, items) {        })
        res.render('ongoingjobs'); 

    });

router.get('/tilaukset', function(req, res) { 
        res.render('orders');
    });

//POST

router.post('/tilaukset', function(req, res) {
    var job = req.body;
    Job.create(job, function(err, job) {
        if(err) {
            return res.status(500).json({err: err.message});
        }
        console.log("Job created.");
        res.send(job._id);
        })
    });

module.exports = router;
