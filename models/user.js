const mongoose = require('mongoose');
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    nom: { type: String, required: true },
    prenom: { type: String, required: true },
    telephone: { type: String, required: true },
    email: { type: String, required: true, unique: true, },
    password: { type: String, required: true },
    token: { type: String, required: false },
  });
 
  module.exports = mongoose.model('User', userSchema);