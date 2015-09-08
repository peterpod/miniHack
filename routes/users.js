var mongoose = require("mongoose"),
    express = require('express'),
    passport = require('passport'),
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
        req.flash('error', "You must be logged in to view that page.");
        res.redirect('/');
    }   else{
        next();
    }
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
    //DELETE
    .delete(function(req,res) {
      User.findById(req.params.id, function(err,user) {
        if (err) { return console.error(err); }
        else {
              // Delete associated attractions
              Attraction.remove({user_id: this.user_id}, function(err) {
             if (err) {throw err;}
             else {
                // Delete user
                user.remove(function (errTwo, user){
                    if (errTwo) {return console.error(errTwo);}
                    else {
                        req.logout();
                        req.flash('success', "Your account and your posts have been successfully deleted.");
                        res.redirect('/');
                      }
                  });
                }
            });
        }
      });
    })
    //Update
    .post(function(req, res) {
      // User avatar feature is not yet implemented, requires additional view and route code...
      var photo;
      User.findByIdAndUpdate(
          req.params.id,
          {
              firstname: req.body.firstname,
              lastname: req.body.lastname,
              username: req.body.username,
              zip: req.body.zip,
              email: req.body.email,
              photo: photo,
          },
          function (err, update) {
            if (err) { res.send('PUT user/:id error: ' + err);}
            else {
              // Trigger appropriate callback with save() (not update) to hash password correctly, if passwd changed;
              User.findById(req.params.id, function(errTwo, user){
                if (req.body.password) {
                  user.password = req.body.password;
                  user.save(function(errThree) {
                  if (errThree) { res.send('PUT user/:id error: ' + errThree); }
                });
                // Continue as normal
                req.flash('success', 'Successfully updated account information.');
                res.redirect("/users/" + req.params.id);
                };
              })
           }
      });
    });

// Edit account page
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

// Find all users
// CURRENTLY UNUSED
router.get('/', function(req, res) {
	User.find({}, function (err,users) {
    if (err) {
      return console.error(err);
    } else {
      res.render('users/index', { "users": users });
    }
  });
});

module.exports = router;

