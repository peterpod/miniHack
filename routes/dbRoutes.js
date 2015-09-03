/* This is example code I created in another project. Here we are defining 
   the CRUD operations with Mongodb 
*/   

var mongo = require("../models/artistRoutes.js")

//find specific artist
exports.getArtist = function(req, res) {
    var artist = '';
    if(JSON.stringify(req.params)==JSON.stringify({"collection":"artist"}))
    {
      artist = {};
    }
    else{
      artist = {firstname:req.params.firstname,
          lastname:req.params.lastname};
    }
		mongo.find( req.params.collection, 
                    artist,
                    function(model) {
                    	res.render('artistview', { obj: model });
                    }
                  );
	}

//update an artist
exports.postArtist = function(req, res) {
  var artist = {firstname:req.params.firstname,
          lastname:req.params.lastname,
          band:req.body.band, 
          genre:req.body.genre};
  console.log(artist);
	mongo.update( req.params.collection, 
                  artist,
                  function(model) {
                  	res.render('success', {title: 'Mongo Demo', obj: model});
                  }
     );
}

//create a new artist
exports.putArtist = function(req, res) {
  var artist = {firstname:req.params.firstname,
          lastname:req.params.lastname,
          band:req.params.band, 
          genre:req.params.genre};
    mongo.insert( req.params.collection, 
                  artist,
                  function(model) {
                    res.render('artistview', { obj: model });
                    }
                  );
}

//delete an artist
exports.deleteArtist = function(req, res) {
  var artist = {firstname:req.params.firstname,
          lastname:req.params.lastname};
  mongo.delete( req.params.collection, 
                 artist,
                 function(model) {
                	 res.render('success', {title: 'Mongo Demo', obj: model});
                 }
              );
}

