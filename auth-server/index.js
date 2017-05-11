const mongoose = require('mongoose');

const User = require('./user');
const Post = require('./post');

mongoose.connect('mongodb://yoda:yoda@ds133261.mlab.com:33261/lions', (err) => {
  const post = new Post({
    date: Date.now(),
    title: 'My Epic Post',
    content: 'This is just too epic!!',
    author: {
      name: 'Randy Ferrer',
      email: 'rferrer@fvi.edu'
    }
  });

  post.save((err) => {
    if (err) { throw err; }

    console.log(post);
    process.exit();
  });

  Post.find((err, posts) => {
    if (err) {
      throw err;
    }

    console.log(posts);
    process.exit();
  })
});
