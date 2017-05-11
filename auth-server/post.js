const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
  date: { type: Date, required: true, default: Date.now },
  title: { type: String },
  content: { type: String },
  author: {
    name: { type: String },
    email: { type: String }
  },
  comments: { type: String }
});

const Post = mongoose.model('post', PostSchema);

module.exports = Post;
