var mongoose = require('mongoose');
var Dig = require('./models/dig');
var Comment = require("./models/comment");

var data = [
	{
		name: 'parkway central',
		image: 'https://images.unsplash.com/photo-1445968915221-16998c7e84e6?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ca29c0b95c80f1935021c73fd78ff2ee&auto=format&fit=crop&w=1050&q=80',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maxime mollitia tenetur ad sed nihil quidem perferendis ipsum distinctio, quae sit libero debitis ipsa, at magnam id explicabo repellat sapiente repellendus ipsam esse, totam? Ad temporibus aperiam sequi, perspiciatis sed nulla voluptas itaque voluptates ex, cupiditate repudiandae dolorem laboriosam, culpa quo.'
	},
	{
		name: 'vincent fumo memorial',
		image: 'https://images.unsplash.com/photo-1468802337661-685a628d58a1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=29caf1b8d5849652062776146f9ac5de&auto=format&fit=crop&w=1050&q=80',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque, atque, obcaecati. Corporis amet, inventore debitis, autem repellat nemo praesentium ad eius iste, nihil distinctio modi dolore mollitia. Architecto perspiciatis necessitatibus eum, ducimus, non qui harum odit nulla omnis in debitis.'
	},
	{
		name: 'berks warehouse',
		image: 'https://images.unsplash.com/photo-1469321589923-e19da1f4bfdc?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=4a713a1ded91c248aaa96841d8926288&auto=format&fit=crop&w=1050&q=80',
		description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt ea alias sunt molestiae aliquid architecto ipsa vel omnis, iusto! Odio dicta error modi magni eaque minima dolorum, sint atque animi pariatur expedita, maiores ea sunt? Iusto incidunt laudantium et enim nisi, minima voluptatibus nam quis unde. Quos non consequatur ad necessitatibus voluptas totam sequi atque asperiores, facilis, laudantium tenetur maxime doloremque. Rem dignissimos autem quo.'
	}

]

function seedDB(){
	//remove
	Dig.remove({}, function(err){
	if(err){
		console.log(err);
	} 		
		console.log('removed digs');
		data.forEach(function(seed){
			Dig.create(seed, function(err, dig){
				if(err){
					console.log(err);
				} else {
					console.log('ADDED THAT DIG BRO');
					//create comment
					Comment.create(
					{
						text: 'lemme get twenty bucks bruh',
						author: 'loro'
					}, function(err, comment){
							if(err){
								console.log(err);
							} else {
								dig.comments.push(comment._id);
								dig.save();
								console.log('comment created');
							}
					});
				}
		});
	});
	});
}

module.exports = seedDB;	


