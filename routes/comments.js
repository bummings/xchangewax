var express = require('express');
var router = express.Router({mergeParams: true});
var Dig = require('../models/dig');
var Comment = require('../models/comment');
var middleware = require('../middleware');

//comments new
router.get('/new', middleware.isLoggedIn, function(req, res){
	//find dig by id
	Dig.findById(req.params.id, function(err, dig){
		if(err){
			console.log(err);
		} else {
			res.render('comments/new', {dig: dig});
		}
	})
});

//comments create
router.post('/', middleware.isLoggedIn, function(req, res){
	//look up dig using id
	Dig.findById(req.params.id, function(err, dig){
			if(err){
				console.log(err);
				res.redirect('/digs');
			} else {
				Comment.create(req.body.comment, function(err, comment){
					if(err){
						console.log(err);
					} else {
						//add username and id to comment
						comment.author.id = req.user._id;
						comment.author.username = req.user.username;

						//save comment
						comment.save();
						dig.comments.push(comment._id);
						dig.save();
						req.flash('success', 'Successfully added comment.');
						res.redirect('/digs/' + dig._id);
					}
				});
		}
	})
});

//COMMENTS EDIT ROUTE

router.get('/:comment_id/edit', middleware.checkCommentOwnership, function(req, res){
	Comment.findById(req.params.comment_id, function(err, foundComment){
		if(err){
			res.redirect('back');
		} else {
			res.render('comments/edit', {dig_id: req.params.id, comment: foundComment});

		}
	});
});


// COMMENTS UPDATE
router.put('/:comment_id', middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
		if (err){
			res.redirect('back');
		} else {
			res.redirect('/digs/' + req.params.id);
		}
	});
})


// COMMENTS DESTROY ROUTE
router.delete('/:comment_id', middleware.checkCommentOwnership, function(req, res){
	Comment.findByIdAndRemove(req.params.comment_id, function(err) {
		if (err) {
			res.redirect('back');
		} else {
			req.flash('success', 'Comment deleted.');
			res.redirect('/digs/' + req.params.id);
		}
	})
})


module.exports = router;




