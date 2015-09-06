var mongoose = require("mongoose"),
    express = require('express'),
    router = express.Router(),
    bodyParser = require("body-parser"),
    
    //File upload requirement
   
    multer  = require('multer'),
    upload = multer({ dest: 'uploads/' }),
    
    Attraction = require('../models/attraction');

// Find all attractions
router.get('/', function(req, res) {
	Attraction.find({}, function (err,attractions) {
    if (err) {
      return console.error(err);
    } else {
      res.render('attractions/index', { "pageName": "Attractions",
                                        "currentUser": req.user,
                                        "attractions": attractions });
    }
  });
});

//find specific attraction
router.route('/:id')
     //Show
    .get(function(req, res) {
      Attraction.findById(req.params.id, function(err,attraction) {
        if (err) {
          console.log('GET attraction/:id error: ' + err)
        } else {
          res.render('attractions/show', {
            "pageName": "Attractions",
            "attraction": attraction,
            "currentUser": req.user
          })
        }
      });
    })

// LOGIN CHECK
router.use(function(req, res, next) {
    if (!req.user){
        res.redirect('/');
    }   else{
        next();
    }
});

// New attaction page
router.get('/new', function(req, res) {
    res.render('attractions/new', {"pageName": "Attractions",
                                   "currentUser": req.user});
});

// Create an attraction
router.post('/', upload.single('photo'), function(req, res) {
  Attraction.create({
      user:req.user._id,
      type:req.body.type,
      title:req.body.title,
      description:req.body.description,
      address:req.body.address,
      city:req.body.city,
      state:req.body.state,
      zip:req.body.zip,
      dollar:req.body.dollar,
      photo:req.file.path
    }, function(err,attraction) {
      if (err) { res.send('POST attraction/ error: ' + err)}
      else {
        res.redirect("/attractions");
        }
      });
  });

//find specific attraction
router
    //Update
    .put(function(req, res) {
      Attraction.findById(req.params.id, function(err,attraction) {
        attraction.update({
          title:req.body.title,
          description:req.body.description
        }, function (err, attractionID) {
          if (err) {
            res.send('PUT attraction/:id error: ' + err)
          } else {
            res.redirect("/attractions/" + attraction._id)
          }
        });
      });
    })
    //DELETE
    .delete(function(req,res) {
      Attraction.findById(req.params.id, function(err,attraction) {
        if (err) { return console.error(err); }
        else {
              attraction.remove(function (err, attraction){
                  if (err) {return console.error(err);}
                  else {res.redirect("/attractions");}
                });
              }
      });
    });
    
// Edit attraction page
router.get('/:id/edit', function(req, res) {
    Attraction.findById(req.params.id, function (err, attraction) {
        if (err) {
            console.log('GET attraction/:id/edit error: ' + err);
        } else {
          res.render('attractions/edit', {
                         "pageName": "Attractions",
                         "attraction" : attraction,
                         "currentUser": req.user
                      });
                 }
            });
        });

module.exports = router;

