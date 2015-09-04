var mongoose = require("mongoose"),
    express = require('express'),
    router = express.Router(),
    
    User = require('../models/user');

// New user page
router.get('/new', function(req, res) {
    res.render('users/new', { "pageName": "Users"});
});

// Create a user
router.post('', function(req, res) {
  User.create({
      firstname:req.body.firstname,
      lastname:req.body.lastname
    }, function(err,user) {
      if (err) { res.send('POST user/ error: ' + err)}
      else {
        res.location("users");
        res.redirect("/users/" + user._id);
        }
      });
  });

// Find all users
router.get('/', function(req, res) {
	User.find({}, function (err,users) {
    if (err) {
      return console.error(err);
    } else {
      res.render('users/index', { "pageName": "Users",
                                        "users": users });
    }
  });
});

// The remaining routes require :id param is valid, so validate that now
router.param('id', function(req,res,next,id) {
  User.findById(id, function (err, user) {
    if (err){
      // User not found, raise 404
      next(err)
    } else {
      next(); 
    }
  });
});

//find specific user
router.route('/:id')
     //Show
    .get(function(req, res) {
      User.findById(req.params.id, function(err,user) {
        if (err) {
          console.log('GET user/:id error: ' + err)
        } else {
          res.render('users/show', {
            "pageName": "Users",
            "user": user
          })
        }
      });
    })
    //Update
    .put(function(req, res) {
      User.findByIdAndUpdate(
          req.params.id,
          {
            firstname:req.body.firstname,
            lastname:req.body.lastname
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
                          "user" : user
                      });
                 }
            });
        });

module.exports = router;

