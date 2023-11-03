require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const passport = require('passport');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true });

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());

// EJS setup
app.set('view engine', 'ejs');

// Import Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');

// Use Routes
app.use('/', indexRoutes);
app.use('/', authRoutes);

app.listen(3000, () => {
  console.log('Server started on port 3000.');
});
