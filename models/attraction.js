var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
    
var attractionSchema = new Schema({
  title: String,
  description: String,
  type: String,
  category: String,
  address: String,
  city: String,
  state: String,
  zip: String,
  dollar: String,
  photo: String,
  user: String
});

var Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction;