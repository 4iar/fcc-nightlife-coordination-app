"use strict";
const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const Yelp = require('yelp');

var yelp = new Yelp({
  consumer_key: process.env.YELP_CONSUMER_KEY,
  consumer_secret: process.env.YELP_CONSUMER_SECRET,
  token: process.env.YELP_TOKEN,
  token_secret: process.env.YELP_TOKEN_SECRET
});

// setup db
const port = process.env.PORT || 5000;
const MongoClient = mongodb.MongoClient;
const mongolabUri = process.env.MONGODB_URI;
let db;

const app = express();
app.use(bodyParser.json({ extended: true }))
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (request, response) => {
  response.json({hello: 'world'});
});

app.get('/api/nightlife', (request, response) => {
  if (!request.query.lat || !request.query.lon) {
    response.json({status: "error", message: "coordinates not provided"});
  }
  
  const lat = request.query.lat;
  const lon = request.query.lon;
  yelp.search({term: 'nightlife', ll: lat + ',' + lon})
    .then((data) => {
      response.json({status: "success", message: "", data});
    })
    .catch(() => {
      response.json({status: "error", message: "error contacting the yelp api"});
    })
});

MongoClient.connect(mongolabUri, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(port);
})
