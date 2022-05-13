const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  dob: Date,
  address: String,
  description: String,
  email: String,
  password: String,
  createdAt: Date
}
);

module.exports = mongoose.model('User', userSchema)