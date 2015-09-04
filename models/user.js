var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose');
    
var userSchema = new Schema({
  firstname: String,
  lastname: String,
  username: String,
  password: String,
  zip: String
});

// passport-local-mongoose package takes care of salting/hashing passwords
userSchema.plugin(passportLocalMongoose);

var User = mongoose.model('User', userSchema);

module.exports = User;