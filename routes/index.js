var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
  if (req.isAuthenticated()) {
    return next();   
  }
  res.redirect('/login');
}

module.exports = function(passport){

  router.get('/', isAuthenticated, function(req, res) {
    res.render('index', { message: req.flash('message') });
  });

  router.get('/login', function(req, res) {
    res.render('login', { message: req.flash('message') });
  });

  router.post('/login', passport.authenticate('login', {
    successRedirect: '/',
    failureRedirect: '/',
    failureFlash : true  
  }));

  router.get('/signup', function(req, res){
    res.render('register',{message: req.flash('message')});
  });

  router.post('/signup', passport.authenticate('signup', {
    successRedirect: '/',
    failureRedirect: '/signup',
    failureFlash : true  
  }));

  router.get('/signout', function(req, res) {
    req.logout();
    res.redirect('/');
  });

  return router;
}