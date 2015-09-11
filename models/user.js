var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    passportLocalMongoose = require('passport-local-mongoose'),
    uniqueValidator = require('mongoose-unique-validator');

var userSchema = new Schema({
  firstname: {type: String, required: true, unique: true},
  lastname: {type: String, required: true, unique: true},
  username: {type: String, required: true, unique: true},
  password: { type: String, required: true },
  zip: {type: String, required: true, unique: true},
  starredAttraction: [Number],
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

// passport-local-mongoose package takes care of salting/hashing passwords
userSchema.plugin(passportLocalMongoose);
userSchema.plugin(uniqueValidator);

var User = mongoose.model('User', userSchema);

module.exports = User;
