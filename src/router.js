'use strict';

const express = require('express');
const router = express.Router();
const _ = require('lodash');
const models = require('../server/models/index.js');
const errormessage = "<h1>Server error occurred. Please come again.</h1>"

//GET

router.get('/', function(req, res) {
        res.render('orders'); 
    });

//ongoingjobs

router.get('/avoimet', function(req, res, next) {
    models.Job.findAll({
        where: {
            billed: false
        },
        order: [['orderdate', 'ASC']]
    }).then(function(data) {
        res.render('ongoingjobs', { data: data });
    });
});

//billedjobs

router.get('/laskutetut', function(req, res, next) {
    models.Job.findAll({
        where: {
            billed: true
        },
        order: [['clientname', 'ASC'], ['actual_completion_date', 'ASC']]
    }).then(function(data) {
        res.render('billedjobs', { data: data });
    });
});

//POST

router.post('/', function(req, res) {
    models.Job.create({
        clientname: req.body.clientname,
        address: req.body.address,
        orderdate: req.body.orderdate,
        sitesize: req.body.sitesize,
        stonework: req.body.stonework,
        stoneworkdescription: req.body.stoneworkdescription,
        streetcategory: req.body.streetcategory,
        completiongoal: req.body.completiongoal,
        completiondate: req.body.completiondate,
        started: false,
        startdate: null,
        completed: false,
        actual_completion_date: null,
        billed: false
    }).then(function(job) {
        res.json(job);
    });
});

//PUT

router.put('/avoimet', function(req, res) {
    models.Job.upsert({
        id: req.body.id,
        started: req.body.started,
        startdate: req.body.startdate,
        completed: req.body.completed,
        actual_completion_date: req.body.completiondate,
        billed: req.body.billed
    }).then(function(job) {
        res.json(job);
    });
});


module.exports = router;