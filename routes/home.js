var mongoose = require("mongoose"),
    express = require('express'),
    router = express.Router(); //mongo connection
    
//get home page
router.get('/',function(req, res) {
    res.render('home/index', {pageName: 'Home'});
  });

//get about page
router.get('/about',function(req, res) {
    res.render('home/about', {pageName: 'About'});
  });

//get about page
router.get('/contact',function(req, res) {
    res.render('home/contact', {pageName: 'Contact'});
  });
  
module.exports = router;

