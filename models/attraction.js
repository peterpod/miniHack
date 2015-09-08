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
  user_id: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var business = new Array ("Clothing","Electronics");
var food = new Array ("Truck, Restaurant");

attractionSchema.pre('save', function(next) {
  var type;
  if (business.indexOf(this.category) > -1) {type = "Business";}
  else if (food.indexOf(this.category) > -1) {type = "Food"; }
  else { type = type; }
  this.type = type;
  next();
});

attractionSchema.pre('update', function() {
  var type;
  if (business.indexOf(this.category) > -1) {type = "Business";}
  else if (food.indexOf(this.category) > -1) {type = "Food"; }
  else { type = type; }
  this.update({},{ $set: { type: type, updated_at: new Date() } });
});

var Attraction = mongoose.model('Attraction', attractionSchema);

module.exports = Attraction;