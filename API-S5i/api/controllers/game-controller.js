'use strict';

const igdb = require('igdb-api-node').default;
const client = igdb('c58fcf9c1efb6b715eb852731cb29bc7');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;
  var dbo = db.db("groupe2");
  dbo.createCollection("cache", function(err, res) {
    if (err) throw err;
    console.log("Cache actif!");
    db.close();
  });
});

// Sytème de mise en cache fonctionnel pour la partie recherche par Id
exports.findGame = function(req, res) {
  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("Groupe 2");
    dbo.collection("cache").find({id: Number(req.params.gameId)}).toArray(function(err, mongoose) {
      if (err) throw err;
      if (mongoose.length) {
        console.log("Présente en base");
        res.json(mongoose);
      }
      else {
        console.log("Nouvelle entrée");
          return client.games({
              fields: '*',
              ids: [req.params.gameId]
          }).then(igdbResponse => {
          res.send(igdbResponse.body);
            MongoClient.connect(url, function(err, db) {
              if (err) throw err;
              var dbo = db.db("Groupe 2");
              dbo.collection("cache").insert(igdbResponse.body, {new:true}, function(err, res) {
                if (err) throw err;
                  console.log(res);
                  db.close();
              });
            });
          });
      }
      db.close();
    });
  });
};

exports.findGameByKeyWord = function(req, res) {
  return client.games({
      fields: '*',
      limit: 20,
      offset: 0,
      search: req.params.text
  }).then(igdbResponse => {
    res.send(igdbResponse.body);
  });
};

exports.clearCache = function(req, res) {
MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var dbo = db.db("GameTracker");
      dbo.collection("cache").remove({}, function(err, res) {
        if (err) throw err;
          console.log("remove ok");
          db.close();
      });
    });
  res.json("cache vidé")
};