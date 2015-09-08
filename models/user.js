var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
    
var userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  zip: String,
  email: String,
  photo: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// passport-local-mongoose package takes care of salting/hashing passwords
userSchema.plugin(passportLocalMongoose);

userSchema.pre('update', function() {
  this.update({},{ $set: { updated_at: new Date() } });
});

var User = mongoose.model('User', userSchema);

module.exports = User;