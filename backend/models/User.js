import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: String,
  address: String, 
  role: { type: String, default: 'User' },
  password: String,
});

const User = mongoose.model('User', userSchema);
export default User;
