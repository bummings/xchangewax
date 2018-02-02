var mongoose = require('mongoose');
var digSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  address: String,
  author: {
  	id: {
  		type: mongoose.Schema.Types.ObjectId,
  		ref: 'User'
  	},
  	username: String
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Comment'
    }
  ]
});
module.exports = mongoose.model('Dig', digSchema);