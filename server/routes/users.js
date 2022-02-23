var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.use('login', new LocalStrategy({usernameField: 'username', passwordField: 'password'}, (username, password, done) => {
  if (!username || !password) { return done(null, false, { message: 'No username or password.' }); }
  if (username === 'admin' && password === 'admin') { return done(null, { username: username}); }
  return done(null, false, { message: 'Incorrect username or password.' });
}));

function setCookie (req, res, isClearCookie, cookieAge = 3600 * 8 * 1000) {
  const CNameUserID = 'userID',
  CNameAccessToken = 'accessToken',
  CNAMEDisplayName = 'displayName';

  let expDate = new Date(Date.now() + (isClearCookie ? 0 : cookieAge));

  let cookieOpt = {
      maxAge: cookieAge,
      expires: expDate,
      httpOnly: false,
      secure: true,
      sameSite: false
  }; // domain and path use default

  res.cookie(CNameUserID, isClearCookie ? '' : req.session.user.username, cookieOpt);
  res.cookie(CNAMEDisplayName, isClearCookie ? '' : req.session.user.username, cookieOpt);
  res.cookie(CNameAccessToken, isClearCookie ? '' : req.session.id, cookieOpt);
}

router.post('/login', (req, res) => {
  passport.authenticate('login', function (err, user, info) {    
      if (err) {
          return res.status(500).send(err);
      }
      if (user) {
        req.logIn(user, function(err) {
          if (err) { return res.status(500).send(err); }
          console.log('*** login callback req.session: ', req.session, '; req.user:', req.user, '; isAuthenticated: ', req.isAuthenticated());

          req.session.user = req.user;
          req.session.save(err => {
            if (err) {
              return res.status(500).send(err);
            } // set cookies
            setCookie(req, res, false)
            res.redirect('/'); // ?userID=+req.session.user.username, put it into cookie
          })
        })
      } else {
          res.status(500).send(info.message);
      }
  })(req, res)
})

router.get('/logout', function (req, res) {
  req.logout()
  req.session.destroy((err) => {
    setCookie(req, res, true, 0)
    res.redirect('/')
  })
})

module.exports = router;
