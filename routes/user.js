const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const router = express.Router();
const tokenUtils = require('../utils/tokenUtils');

/* GET user profile. */
router.get('/', ensureLoggedIn('/auth'), function (req, res, next) {
  const env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.AUTH0_CALLBACK_URL,
    LOGOUT_URL: process.env.LOGOUT_URL,
    APP_BASE_URL: process.env.APP_BASE_URL
  };
  // extract custom claims info from id token indicating what "state" this profile is in
  const profileIncomplete = tokenUtils.getClaim(req.session.id_token, 'https://claims.myapp.com/profile_incomplete');
  if (!profileIncomplete) {
    // all good, just show page, no need for SMS
    return res.render('user', { env: env, user: req.user, showProfileForm: false });
  } else {

      res.render('user', { env: env, user: req.user, showProfileForm: true });
    }
  
});

module.exports = router;
