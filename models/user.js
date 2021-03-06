var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt-nodejs'),
    uniqueValidator = require('mongoose-unique-validator');
var userSchema = new Schema({
  firstname: {type: String, required: true},
  lastname: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  zip: {type: String, required: true},
  starredAttraction: {type:[String], default: []},
  email: String,
  photo: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

userSchema.plugin(uniqueValidator);
//taken from http://sahatyalkabov.com/how-to-implement-password-reset-in-nodejs/
userSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) return next();
  bcrypt.genSalt(5, function(err, salt) {
    if (err) return next(err);
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});
userSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

userSchema.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

var User = mongoose.model('User', userSchema);

module.exports = User;
