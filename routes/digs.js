var express = require('express');
var router = express.Router();
var Dig = require('../models/dig');
var middleware = require('../middleware');

//INDEX- show all digs
router.get('/', function(req, res){
	//get all digs from DB
	Dig.find({}, function(err, allDigs){
		if(err){
			console.log(err);
		} else {
			res.render('digs/index', {digs:allDigs});
		}
	});
});


//CREATE- add new dig to DB
router.post('/', middleware.isLoggedIn, function(req, res){
	// get data from form
	var name = req.body.name;
	var image = req.body.image;
	var address = req.body.address;
	var desc = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var newDig = {name: name, image: image, address: address, description: desc, author:author};
	
	//create new dig and save to DB
	Dig.create(newDig, function(err, newlyCreated){
		if (err) {
			console.log(err);
		} else {
			res.redirect('/digs');
		}
	})
});


// NEW- show form to create new dig
router.get('/new', middleware.isLoggedIn, function(req, res){
	res.render('digs/new');
});


// SHOW- find dig in question, render it with show template
// :ID ROUTES MUST BE DECLARED LAST, SO AS TO NOT WILDCARD EVERYTHING
router.get('/:id', function(req, res){
	//find dig by provided id
	Dig.findById(req.params.id).populate('comments').exec(function(err, foundDig){
		if(err){
			console.log(err);
		} else {
			console.log(foundDig);
			res.render('digs/show', {dig: foundDig});
		}
	});
});


// EDIT DIG
router.get('/:id/edit', middleware.checkOwnership, function(req, res){
	Dig.findById(req.params.id, function(err, foundDig){
			res.render('digs/edit', {dig: foundDig});	
	});
});

// UPDATE DIG

router.put('/:id', middleware.checkOwnership, function(req, res){
	//find and update correct dig
	Dig.findByIdAndUpdate(req.params.id, req.body.dig, function(err, updatedDig){
			if (err){
				res.redirect('/digs');
		} else {
			res.redirect('/digs/' + req.params.id);
		}
	});
});


// DESTROY DIG
router.delete('/:id', middleware.checkOwnership, function (req, res){
	Dig.findByIdAndRemove(req.params.id, function (err){
		if (err) {
			res.direct('/digs');
		} else {
			res.redirect('/digs');
		}
	});
});



module.exports = router;


