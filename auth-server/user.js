const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

let User;

const UserSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String },
  username: { type: String },
  email: {
    type: String,
    required: true,
    index: { unique: true }
  },
  password: { type: String, required: true }
});

// validation
// ----------

UserSchema.path('email').validate((email) => {
  return /.?@.?\.?/.test(email);
}, 'Invalid email address');

// filters
//--------

UserSchema.pre('save', function(next) {
  const user = this;

  // only hash the password if it's new or has been modified
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) return next(err);

  // hash the password using the new salt
  bcrypt.hash(user.password, salt, function(err, hash) {
    if (err) return next(err);

    user.password = hash;
    next();
  });
  });
});

// Static methods
// --------------
UserSchema.static('attemptLogin', (email, password, cb) => {
  User.findByEmail(email, (err, user) => {
    if (err) { return cb(err); }

    if (!user) {
      return cb();
    }

    user.comparePassword(password, (err, isMatch) => {
    if (err) { return cb(err); }

    if (isMatch) {
      return cb(null, user);
    } else {
      return cb();
    }
  });
});
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) =>{
    if (err) { throw err; }
    cb(null, isMatch);
  });
};

// Virtual Fields
// --------------

UserSchema.virtual('fullName').get(function() {
  return `${this.firstName} ${this.lastName}`;
});

UserSchema.static('findByEmail', (email, cb) => {
  User.findOne({ email: email}, cb);
});

User = mongoose.model('user', UserSchema);

module.exports = User;
