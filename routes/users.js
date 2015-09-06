var mongoose = require("mongoose"),
    express = require('express'),
    router = express.Router();
    
    User = require('../models/user'),
    Attraction = require('../models/attraction');

// LOGIN CHECK
router.use(function(req, res, next) {
    if (!req.user){
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
      res.render('users/index', { "pageName": "Users",
                                  "currentUser" : req.user,
                                  "users": users });
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
              "pageName": "Users",
              "currentUser": req.user,
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
              res.send('PUT user/:id error: ' + err)
            } else {
              res.redirect("/users/" + user._id)
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
                         "pageName": "Users",
                         "currentUser" : req.user,
                          "user" : user
                      });
                 }
            });
        });

module.exports = router;

