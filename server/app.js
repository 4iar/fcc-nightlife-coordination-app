"use strict";
const express = require('express');
const mongodb = require('mongodb');
const bodyParser = require('body-parser');
const _ = require('lodash');
const Yelp = require('yelp');
const passport = require('passport');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const strategy = require('./setup-passport');



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
app.use(cookieParser());
// See express session docs for information on the options: https://github.com/expressjs/session
app.use(session({ secret: process.env.AUTH0_CLIENT_SECRET, resave: false,  saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.get('/', (request, response) => {
  response.json({hello: 'world'});
});

// Auth0 callback handler
app.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/url-if-something-fails' }),
  function(req, res) {
    if (!req.user) {
      throw new Error('user null');
    }
    res.redirect("/user");
  });

app.get('/api/nightlife', (request, response) => {
  if (!request.query.lat || !request.query.lon) {
    response.json({status: "error", message: "coordinates not provided"});
  }

  // TODO: get the numbers of people attending
  const lat = request.query.lat;
  const lon = request.query.lon;
  const userId = request.query.user ? request.query.user : null// placeholder for user auth id
  let venues = [];
  yelp.search({term: 'nightlife', ll: lat + ',' + lon})
    .then((data) => {
      const venuesRaw = data.businesses;
      venuesRaw.forEach((v) => {
        venues.push({
          name: v.name,
          id: v.id,
          phone: v.display_phone,
          description: v.snippet_text,
          thumbnailUrl: v.snippet_image_url,
          headerUrl: v.snippet_image_url,  // need to get the large url
          numGoing: 0,  // query db for this
          distance: Math.floor(v.distance),
          userGoing: false
        });
      })
      
      // TODO: refactor this spaghetti code -- can simplify by converting to obj and back to array at end
      const venueIds = _.map(venues, 'id');
      db.collection('venues').find({id: {$in: venueIds}}).toArray((error, data) => {
        if (error) {
          response.json({status: "error", message: ""});
        } else if (data) {
          data.forEach((venue) => {
            const numGoing = _.values(venue.attending).reduce((prev, curr) => {
              return prev + curr;
            }, 0)
            
            const i = venues.map(function(e) { return e.id; }).indexOf(venue.id);
            venues[i].numGoing = numGoing;

           if (userId) {
             const userGoing = venue.attending[userId];
             console.log("venue: "  + venue.id + "curr user: " + userId + " venue user id: " + _.keys(venue.attending) + 'user is going: ' + userGoing);
             venues[i].userGoing = userGoing;
           }
          })
          response.json({status: "success", message: "", venues});
        }
      })
    })
    .catch((err) => {
      response.json({status: "error", message: "error contacting the yelp api", error});
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
