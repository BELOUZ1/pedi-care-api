const mongoose = require('mongoose');

const blogsSchema = mongoose.Schema({
  idmedecin: { type: String, required: true },
  nommedecin: { type: String, required: true },
  prenommedecin: { type: String, required: true },
  titre: { type: String, required: true },
  content: { type: String, required: true },
});

module.exports = mongoose.model('blogs', blogsSchema);