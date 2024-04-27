const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  type: { type: String, required: true },
  civilite: { type: String, required: false },
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  telephone: { type: String, required: true },

  specialite: { type: String, required: false },
  adresse: { type: String, required: false },
  ville: { type: String, required: false },
  telephonepro: { type: String, required: false },

  email: { type: String, required: true, unique: true, },
  password: { type: String, required: true },
  token: { type: String, required: false },
});

module.exports = mongoose.model('User', userSchema);