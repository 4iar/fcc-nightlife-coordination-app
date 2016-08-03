"use strict";
const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');


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



MongoClient.connect(mongolabUri, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(port);
})
