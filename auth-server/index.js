const mongoose = require('mongoose');

const User = require('./user');

mongoose.connect('mongodb://yoda:yoda@ds133261.mlab.com:33261/lions', (err) => {
  // Create a new document using our model
  const me = new User({
    firstName: 'Randy',
    lastName: 'Ferrer',
    username: 'randyf',
    email: 'rferrer@fvi.edu',
    password: 'coolPassword'
  });

  me.save((err) => {
    if (err) {
      throw err;
    }

    User.find((err, users) => {
      if (err) {
        throw err;
      }

      console.log(users);
      process.exit();
    });
  });

});
