const express = require('express');
const passport = require('passport');
const router = express.Router();
const authorize = require('../utils/authorize');

/* GET home page. */
router.get('/', function (req, res, next) {

  const env = {
    APP_BASE_URL : process.env.APP_BASE_URL
  };
  res.render('index',{ env: env });
});

router.get('/elogin', function (req, res) {
  const env = {
    AUTH0_CLIENT_ID: process.env.AUTH0_CLIENT_ID,
    AUTH0_DOMAIN: process.env.AUTH0_DOMAIN,
    AUTH0_CALLBACK_URL: process.env.APP_BASE_URL + process.env.AUTH0_CALLBACK_URL,
    AUDIENCE: process.env.AUDIENCE || 'https://#{env.AUTH0_DOMAIN}/userinfo',
    SCOPE: process.env.SCOPE,
    APP_BASE_URL : process.env.APP_BASE_URL
  };
  res.render('login', { env: env });
});

router.get('/clogin', function (req, res) {
  if(req.query["prompt"] == "none")
  authorize(req, res, true);
  else authorize(req, res, false);
});

router.get('/auth', function (req, res) {
  if (req.user) {
    res.redirect('/user');
  } else {
    // check if SSO session exists..
    authorize(req, res, true);
  }
});

router.get('/logout', function (req, res) {
  req.logout();
  res.redirect(`https://${process.env.AUTH0_DOMAIN}/v2/logout?client_id=${process.env.AUTH0_CLIENT_ID}&returnTo=${process.env.APP_BASE_URL}`);
});

router.get('/callback',
  passport.authenticate('auth0', { failureRedirect: '/failure' }),
  function (req, res) {
    // res.redirect(req.session.returnTo || '/user');
 
    res.redirect('/user');
  });

router.get('/failure', function (req, res) {
  var error = req.flash('error');
  var errorDescription = req.flash('error_description');
  req.logout();
  res.render('failure', {
    error: error[0],
    error_description: errorDescription[0]
  });
});

module.exports = router;
