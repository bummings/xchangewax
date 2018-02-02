var Dig = require('../models/dig');
var Comment = require('../models/comment');
var middlewareObj = {};
// var currentUser = req.user;

middlewareObj.checkOwnership = function(req, res, next) {
	if (req.isAuthenticated()){
	Dig.findById(req.params.id, function(err, foundDig){
	if(err){
		req.flash('nope', 'Not found!');
		res.redirect('back');
	} else {
		//is it their dig?
		if(foundDig.author.id.equals(req.user._id)) {
			next();
		} else {
			req.flash('nope', 'You do not have permission to do that.');
			res.redirect('back');

			}
		}
	});

	} else {
		req.flash('nope', 'You need to be logged in to do that!'); //yknow
		res.redirect('back');
	}
}




middlewareObj.checkCommentOwnership = function(req, res, next) {
		if (req.isAuthenticated()){
		Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect('back');
		} else {
			//is it their comment?
			if(foundComment.author.id.equals(req.user._id)) {
				next();
			} else {
				req.flash('nope', 'You do not have permission to do that.');
				res.redirect('back');

				}
			}
		});

		} else {
			req.flash('nope', 'You need to be logged in to do that.');
			res.redirect('back');
		}
}


middlewareObj.isLoggedIn = function isLoggedIn(req, res, next) {
		if(req.isAuthenticated()){
			return next();
		}
		req.flash("nope", "You need to be logged in to do that!");
		res.redirect('/login');
	}






module.exports = middlewareObj;


