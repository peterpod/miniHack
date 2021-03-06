var mongoose = require("mongoose"),
    express = require('express'),
    passport = require('passport'),
    router = express.Router(),
    
    User = require('../models/user');
    
//get home page
router.get('/',function(req, res) {
    res.render('home/index', {pageName: 'Home', "currentUser": req.user});
  });

//get about page
router.get('/about',function(req, res) {
    res.render('home/about', {pageName: 'About', "currentUser": req.user});
  });

//get about page
router.get('/contact',function(req, res) {
    res.render('home/contact', { "pageName": 'Contact',
                                 "currentUser": req.user} );
  });
  
// Session management  

// Login get page
router.get('/login', function(req, res) {
  res.render('home/login', { "currentUser": req.user, "user": {} });
});

// Login post action
router.post('/login', 
  passport.authenticate('local', {failureRedirect: '/login', failureFlash: true}),
  function(req, res) {
    req.flash('success','Logged in!');
    res.redirect('/');
});

// Logout
router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', "Logged out successfully.");
  res.redirect('/');
});

// Create a user and log in as them
router.post('/register', function(req, res) {
  var user = new User( {
      username:req.body.username,
      firstname:req.body.firstname,
      password:req.body.password,
      lastname:req.body.lastname,
      email:req.body.email,
      zip:req.body.zip
    });
  
  user.save(function(err) {
      if (err) { res.send('POST user/ error: ' + err)}
      else {
        req.logIn(user, function(errTwo) {
          req.flash('success', "You are now logged in. Have fun!");
          res.redirect('/');
        });
      };
  });
});


module.exports = router;

