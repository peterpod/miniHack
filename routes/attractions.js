var mongoose = require("mongoose"),
    express = require('express'),
    router = express.Router(),
    bodyParser = require("body-parser"),
    
    //File upload requirements
    multer  = require('multer'),
    upload = multer({ dest: 'public/uploads/' }),
    http = require('http'),
    url = require('url'),
    
    Attraction = require('../models/attraction');


// Set the pageName; used for setting navbar links active
router.use(function(req, res, next){
    res.locals.pageName = "Attractions";
    next();
});

// Find all attractions
router.get('/', function(req, res) {
  conditions = {};
  console.log(req.query);
  if (req.query.type) {
    conditions["type"] = req.query.type;
    var subPageName;
    if (req.query.type == "Business") { subPageName = "Retail" }
    else if (req.query.type == "Food") { subPageName = "Dining" }
    else { subPageName = "Events" };
  };
	Attraction.find(conditions, null, {sort: {"created_at":-1}}, function (err,attractions) {
    if (err) {
      return console.error(err);
    } else {
      res.render('attractions/index', { "attractions": attractions, subPageName: subPageName });
    }
  });
});


// New attaction page
router.get('/new', function(req, res) {
    if (!req.user){ res.redirect('/'); }
    else {
      res.render('attractions/new');
    }
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
            "attraction": attraction
          })
        }
      });
    })

// LOGIN CHECK for all following routes
router.use(function(req, res, next) {
    if (!req.user){
        req.flash('warning', "You must be logged in to view that page.");
        res.redirect('/');
    }   else{
        next();
    }
});

// Create an attraction
router.post('/', upload.single('photo'), function(req, res) {
  var category = req.body.category;
  var business = new Array ("Clothing","Electronics");
  var food = new Array ("Truck, Restaurant");
  var type; var photo;
  if (business.indexOf(category) > -1) {type = "Business";}
  else if (food.indexOf(category) > -1) {type = "Food"; }
  else { type = "Event"; }
  // Slice the /public off of the file path.
  // Use absolute url of the photo so that the url can be used easily in different levels,
  // i.e attractions (1 level) and users/:id (2 levels).
  if (req.file) { photo = 'http://' + req.headers.host + '/' + req.file.path.slice(7) };
  
  Attraction.create({
      user_id:req.user._id,
      type:type,
      category:req.body.category,
      title:req.body.title,
      description:req.body.description,
      address:req.body.address,
      city:req.body.city,
      state:req.body.state,
      zip:req.body.zip,
      dollar:req.body.dollar,
      photo: photo
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
          description:req.body.description,
          updated_at: Date.now
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
                         "attraction" : attraction
                      });
                 }
            });
        });

module.exports = router;

