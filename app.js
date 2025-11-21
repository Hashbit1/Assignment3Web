// app.js

// Load packages
const express = require('express');
const path = require('path');
require('dotenv').config();
const methodOverride = require('method-override');
const connectDB = require('./config/db');
const serviceRoutes = require('./routes/ServiceRoutes'); // our routes file

const app = express();

// Connect to MongoDB
connectDB();

// Port
const PORT = process.env.PORT || 3000;

// View engine setup (EJS)
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse form data from POST requests
app.use(express.urlencoded({ extended: true }));

// Method override so we can use PUT and DELETE with forms
app.use(methodOverride('_method'));

// Serve static files from /public (e.g., /css/styles.css)
app.use(express.static(path.join(__dirname, 'public')));

// Home route - splash page
app.get('/', (req, res) => {
  res.render('index');  // uses views/index.ejs
});

// Use our service routes for anything starting with /services
app.use('/services', serviceRoutes);

// 404 fallback (optional)
app.use((req, res) => {
  res.status(404).send('Page not found');
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
