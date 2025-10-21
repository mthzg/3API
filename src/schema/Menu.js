import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
  restaurant_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
  name: String,
  description: String,
  price: Number,
  category: String
});

export const Menu = mongoose.model('Menu', menuSchema);
