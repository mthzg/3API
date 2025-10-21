import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
  name: String,
  address: String,
  phone: String,
  opening_hours: String
});

export const Restaurant = mongoose.model('Restaurant', restaurantSchema);
