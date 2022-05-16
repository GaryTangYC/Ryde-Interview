const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: String, // _id field was inserted for ease of seeding and testing data
  name: String,
  dob: Date,
  address: String,
  description: String,
  email: String,
  password: String,
}, { timestamps: true }
);

module.exports = mongoose.model('User', userSchema)