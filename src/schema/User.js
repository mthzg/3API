import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: String,
  username: String,
  password: String,
  role: { type: String, default: 'user'}
});

export const User = mongoose.model('User', userSchema);
