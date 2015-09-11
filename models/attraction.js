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
  dollar_low: String,
  dollar_high: String,
  photo: String,
  user_id: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction;
