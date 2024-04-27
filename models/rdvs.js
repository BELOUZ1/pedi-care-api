const mongoose = require('mongoose');

const rdvSchema = mongoose.Schema({
  idmedecin: { type: String, required: true },
  idpatient: { type: String, required: true },
  nommedecin: { type: String, required: true },
  prenommedecin: { type: String, required: true },
  emailmedecin: { type: String, required: true },
  telephonepro: { type: String, required: true },
  adresse: { type: String, required: true },
  nompatient: { type: String, required: true },
  prenompatient: { type: String, required: true },
  telephonepatient: { type: String, required: true },
  specialite: { type: String, required: true },
  heure: { type: String, required: true},
  date: { type: String, required: true },

});


module.exports = mongoose.model('RDV', rdvSchema);