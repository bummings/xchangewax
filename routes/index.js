var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/user');

//root route
router.get('/', function(req, res) {
	res.render('landing');
});



//show reg
router.get('/register', function(req, res){
	res.render('register');
});
	

//signup logic
router.post('/register', function(req, res){
	var newUser = new User({username: req.body.username});
	User.register(newUser, req.body.password, function(err, user){
		if(err){
			req.flash('nope', err.message);
			return res.redirect('register');
		} 
		passport.authenticate('local')(req, res, function(){
			req.flash('success', 'Welcome to xchangewax, ' + user.username);
			res.redirect('/digs');
		});
	});
});


// show login form
router.get('/login', function(req, res){
	res.render("login");
});


// handle login logic
router.post('/login', passport.authenticate('local', 
	{
		successRedirect: '/digs',
		failureRedirect: '/login'
		}), function(req, res){
});


//logout route
router.get('/logout', function(req, res){
	req.logout();
	req.flash('success', 'Logged out.');
	res.redirect('/digs');
});


module.exports = router;

