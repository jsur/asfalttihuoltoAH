'use strict';

const express = require('express');
const router = express.Router();
const _ = require('lodash');
const models = require('../server/models/index.js');
const errormessage = "<h1>Server error occurred. Please come again.</h1>"
require('dotenv').config({'path': '.env'});
const aws = require('aws-sdk');
const s3_bucket = process.env.S3_BUCKET_NAME;

// aws config
aws.config.region = 'eu-central-1';
aws.config.accessKeyId = process.env.S3_KEY;
aws.config.secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;

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

router.get('/api/avoimet', function(req, res, next) {
    models.Job.findAll({
        where: {
            billed: false
        },
        order: [['orderdate', 'ASC']]
    }).then(function(data) {
        res.send({data});
    });
});

router.get('/api/avoimet-by-id', function(req, res, next) {
    models.Job.findById(req.query.id).then(function(data) {
        res.send({data});
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
        billed: false,
        fileurl: req.body.fileurl
    }).then(function(job) {
        res.json(job);
    }, function(err) {
        res.json(err);
    });
});

//PUT

router.put('/avoimet', function(req, res) {
    models.Job.upsert({
        id: req.body.id,
        started: req.body.started,
        startdate: req.body.startdate,
        completed: req.body.completed,
        actual_completion_date: req.body.actual_completion_date,
        billed: req.body.billed,
        original_startdate: req.body.original_startdate
    }).then(function(job) {
        res.json(job);
    });
});

// S3

router.get('/sign-s3', (req, res) => {
    const s3 = new aws.S3();
    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: s3_bucket,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };
  
    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${s3_bucket}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });


module.exports = router;
