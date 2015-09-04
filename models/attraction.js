var mongoose = require('mongoose');
var attractionSchema = new mongoose.Schema({
  title: String,
  description: String
});
var Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction;