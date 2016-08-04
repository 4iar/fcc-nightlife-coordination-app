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

  // TODO: get the numbers of people attending
  const lat = request.query.lat;
  const lon = request.query.lon;
  yelp.search({term: 'nightlife', ll: lat + ',' + lon})
    .then((data) => {
      const venues = data.businesses.map((v) => {
        return {
          name: v.name,
          id: v.id,
          phone: v.display_phone,
          description: v.snippet_text,
          thumbnailUrl: v.snippet_image_url,
          headerUrl: v.snippet_image_url,  // need to get the large url
          numGoing: -1,  // query db for this
          distance: Math.floor(v.distance),
          userGoing: false
        };
      })

      response.json({status: "success", message: "", venues});
    })
    .catch(() => {
      response.json({status: "error", message: "error contacting the yelp api"});
    })
});

app.post('/api/venue/:id/:action/:user', (request, response) => {
  const id = request.params.id;
  const user = request.params.user
  
  let attending
  if (request.params.action === 'attend') {
    attending = true;
  } else if (request.params.action === 'unattend') {
    attending = false;
  } else {
    response.json({status: "error", message: "invalid venue action"});
    return;
  }
  
  let userRef = {};
  userRef['attending.' + user] = attending;
  
  db.collection('venues').update({id}, {$set: userRef}, {upsert: true}, (error, result) => {
    if (error) {
      response.json({status: "error", message: "problem updating the database"})
    } else if (result) {
      response.json({status: "success", message: null});
    }
  })
})

MongoClient.connect(mongolabUri, (err, database) => {
  if (err) return console.log(err)
  db = database
  app.listen(port);
})
