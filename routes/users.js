var mongoose = require("mongoose"),
    express = require('express'),
    router = express.Router();

    User = require('../models/user'),
    Attraction = require('../models/attraction');

// Set the pageName; used for setting navbar links active
router.use(function(req, res, next){
    res.locals.pageName = "Users";
    next();
});

// LOGIN CHECK
router.use(function(req, res, next) {
    if (!req.user){
        req.flash('warning', "You must be logged in to view that page.");
        res.redirect('/');
    }   else{
        next();
    }
});

// Find all users
router.get('/', function(req, res) {
	User.find({}, function (err,users) {
    if (err) {
      return console.error(err);
    } else {
      res.render('users/index', { "users": users });
    }
  });
});

//find specific user
router.route('/:id')
     //Show
    .get(function(req, res) {
      Attraction.find({user_id: req.user._id}, null, {sort: {"created_at":-1}}, function(er, attractions) {
        if (er) throw er;
        User.findById(req.params.id, function(err,user) {
          if (err) {throw err} else {
            res.render('users/show', {
              "user": user,
              "attractions": attractions
            })
          }
        });
      });
    })
    //Update
    .put(function(req, res) {
      User.findByIdAndUpdate(
          req.params.id,
          {
            username:req.body.username,
            firstname:req.body.firstname,
            lastname:req.body.lastname,
            email:req.body.email,
            updated_at: Date.now
          },
          function (err, userID) {
            if (err) {
              res.send('PUT user/:id error: ' + err);
            } else {
              res.redirect("/users/" + user._id);
            }
          }
        );
      })
    //DELETE
    .delete(function(req,res) {
      User.findById(req.params.id, function(err,user) {
        if (err) { return console.error(err); }
        else {
              user.remove(function (err, user){
                  if (err) {return console.error(err);}
                  else {res.redirect("/users");}
                });
              }
      });
    });

// Edit attraction page
router.get('/:id/edit', function(req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            console.log('GET users/:id/edit error: ' + err);
        } else {
          res.render('users/edit', {
                          "user" : user
                      });
                 }
            });
        });

router.get('/:id/attraction/:attractionId/add', function(req, res){
  User.findById(req.params.id, function(err, user){
    // console.log(req.params);
    // console.log("------------------------");
    if(err){
      console.log('GET users/:id/attraction/:attractionId error: ' + err);
    }else{
      favs = user.starredAttraction;
      console.log("=================");
      console.log(favs);
      console.log(req.params.attractionId);

      if (favs.indexOf(req.params.attractionId) == -1){

        user.starredAttraction.push(req.params.attractionId);
        user.save(function (err){
          if (err){
            console.log('updating starrted attraction error: ' + err);
          }else{
            //depending on where it came from
            //attractions or attraction
            console.log('add attraction to Favorite');
            console.log(user);
          }
        });
      }
      // console.log(req);
      res.redirect("/attractions");
    }
  });
});

router.get('/:id/attraction/:attractionId/remove', function(req, res){
  User.findById(req.params.id, function(err, user){
    // console.log(req.params);
    // console.log("------------------------");
    if(err){
      console.log('GET users/:id/attraction/:attractionId error: ' + err);
    }else{
      favs = user.starredAttraction;
      index = favs.indexOf(req.params.attractionId);
      if (index > -1){
        user.starredAttraction.splice(index,1);
        user.save(function (err){
          if (err){
            console.log('updating starrted attraction error: ' + err);
          }else{
            //depending on where it came from
            //attractions or attraction
            console.log('removed attraction from Favorites');
          }
        });
      }
      // console.log(req);
      res.redirect("/attractions");
    }
  });
});
module.exports = router;
