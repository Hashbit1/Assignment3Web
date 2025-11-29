 function ensureAuth(req, res, next) {
  // req.isAuthenticated() is added by Passport
  if (req.isAuthenticated && req.isAuthenticated()) {
    return next();
  }

  return res.status(403).send('You must be logged in to modify services.');
}

module.exports = { ensureAuth };
