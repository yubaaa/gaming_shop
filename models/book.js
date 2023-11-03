const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  price: Number,
  // Additional attributes like 'author', 'publisher', etc.
});

module.exports = mongoose.model('Book', bookSchema);
