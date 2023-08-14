const mongoose = require('mongoose');

const tokenSchema = new mongoose.Schema({
  adhaar: { type: String,},
  registrationToken: { type: String, required: true, unique: true },
});

module.exports = mongoose.model('Token', tokenSchema);