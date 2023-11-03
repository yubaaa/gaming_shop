const express = require('express');
const router = express.Router();
const Book = require('../models/book');

router.get('/', (req, res) => {
  res.render('pages/home');
});

router.get('/shop', (req, res) => {
  Book.find({}, (err, books) => {
    if (err) { /* handle error */ }
    res.render('pages/shop', { books: books });
  });
});

// Add more routes for 'buy' and 'insert' pages

module.exports = router;
