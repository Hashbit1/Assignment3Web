// config/passport.js
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

// Store user id in the session
passport.serializeUser((user, done) => {
  done(null, user.id); 
});

// Retrieve user from the database using the id stored in the session
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,         // from .env
      clientSecret: process.env.GOOGLE_CLIENT_SECRET, // from .env
      callbackURL: '/auth/google/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          provider: 'google',
          providerId: profile.id,
        });

        if (!user) {
          user = await User.create({
            provider: 'google',
            providerId: profile.id,
            displayName: profile.displayName || 'Google User',
            email:
              profile.emails && profile.emails[0]
                ? profile.emails[0].value
                : '',
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// GitHub OAuth strategy
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,         // from .env
      clientSecret: process.env.GITHUB_CLIENT_SECRET, // from .env
      callbackURL: '/auth/github/callback',
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        let user = await User.findOne({
          provider: 'github',
          providerId: profile.id,
        });

        if (!user) {
          user = await User.create({
            provider: 'github',
            providerId: profile.id,
            displayName:
              profile.displayName || profile.username || 'GitHub User',
            email:
              profile.emails && profile.emails[0]
                ? profile.emails[0].value
                : '',
          });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

module.exports = passport;
