// routes/authRoutes.js
const express = require('express');
const router = express.Router();
const passport = require('../config/passport');

// Start Google login flow
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Google OAuth callback
router.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/services' }),
  (req, res) => {
    // If successful, go back to service list
    res.redirect('/services');
  }
);

// Start GitHub login flow
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// GitHub OAuth callback
router.get(
  '/github/callback',
  passport.authenticate('github', { failureRedirect: '/services' }),
  (req, res) => {
    res.redirect('/services');
  }
);

// Logout route
router.get('/logout', (req, res, next) => {
  req.logout(err => {
    if (err) return next(err);
  });
  res.redirect('/services');
});

module.exports = router;
