var util = require("util");
var mongoClient = require('mongodb').MongoClient;
/*
 * This is the connection URL
 * Give the IP Address / Domain Name (else localhost)
 * The typical mongodb port is 27012
 * The path part (here "fallTest") is the name of the databas
 */
var url = 'mongodb://localhost:27017/test';
var mongoDB; // The connected database
// Use connect method to connect to the Server
mongoClient.connect(url, function(err, db) {
  if (err) doError(err);
  console.log("Connected correctly to server");
  mongoDB = db;
});

exports.insert = function(collection, query, callback) {
        console.log(JSON.stringify(query));
        mongoDB.collection(collection).insert(
          query,
          {safe: true},
          function(err, crsr) {
            if (err) doError(err);
            console.log("completed mongo insert");
            callback(crsr);
            console.log("done with insert callback");
          });
        console.log("leaving insert");
}

// FIND
exports.find = function(collection, query, callback) {
        var crsr = mongoDB.collection(collection).find(query);
        crsr.toArray(function(err, docs) {
          if (err) doError(err);
          callback(docs);
        });
 }

// UPDATE
exports.update = function(collection, query, callback) {
  console.log('query'+JSON.stringify(query.firstname));
          mongoDB.collection(collection).update(
            {firstname: query.firstname, lastname: query.lastname},
            query, {
              new: true
            }, function(err, crsr) {
              if (err) doError(err);
              callback('Update succeeded');
        });
  }

// DELETE
exports.delete = function(collection, query, callback) {
        mongoDB.collection(collection).remove(
          {firstname: query.firstname, lastname: query.lastname},
          function(err, crsr) {
              if (err) doError(err);
              callback('Delete succeeded');
          });
  }

