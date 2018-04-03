const express = require('express');
const ensureLoggedIn = require('connect-ensure-login').ensureLoggedIn;
const router = express.Router();
const request = require('request');
const ensureTokenValid = require('../utils/ensureTokenValid');
const authorize = require('../utils/authorize');
const tools = require('auth0-extension-tools');


const handleDelivery = (res, url, accessToken) => {
  const options = {
    url: url,
    json: true,
    headers: {
      'authorization': `bearer ${accessToken}`
    }
  };
  request(options, function (error, response, body) {
    if (error) {
      console.error(error);
      return res.json({ error: true, description: 'Check server logs & whether API Ports already in use' });
    }
    res.json(body);
  });
};

router.get('/session', ensureLoggedIn('/auth'), ensureTokenValid, function (req, res, next) {
  authorize(req, res, true);
});

router.get('/userinfo', ensureLoggedIn('/auth'), ensureTokenValid, function (req, res, next) {
  const url = `https://${process.env.AUTH0_DOMAIN}/userinfo`;
  handleDelivery(res, url, req.session.access_token);
});

router.get('/appointments', ensureLoggedIn('/auth'), ensureTokenValid, function (req, res, next) {
  const url = `${process.env.APP_BASE_URL_NOPORT}:${process.env.CALENDAR_API_PORT}/api/appointments`;
  handleDelivery(res, url, req.session.access_token);
});

router.get('/contacts', ensureLoggedIn('/auth'), ensureTokenValid, function (req, res, next) {
  const url = `${process.env.APP_BASE_URL_NOPORT}:${process.env.CONTACTS_API_PORT}/api/contacts`;
  handleDelivery(res, url, req.session.access_token);
});

router.post('/updateuser', ensureLoggedIn('/auth'), ensureTokenValid, function (req, res, next) {

console.log(req.body);

  tools.managementApi.getClient({ domain: `${process.env.AUTH0_DOMAIN}`, clientId: `${process.env.AUTH0_CLIENT_ID}`, clientSecret: `${process.env.AUTH0_CLIENT_SECRET}` })
  .then(function(client) {
    client.users.updateUserMetadata({id : req.user._json["sub"]}, {"Name" : "Pushp Abrol", "Age" : 42}, function (err, user){
      if(!err)res.redirect(`${process.env.APP_BASE_URL}/clogin?prompt=none`);
      else res.json(err);
    
    });
  });
});

module.exports = router;
