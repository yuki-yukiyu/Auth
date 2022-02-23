var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local');

passport.use('login', new LocalStrategy({usernameField: 'username', passwordField: 'password'}, (username, password, done) => {
  if (!username || !password) { return done(null, false, { message: 'No username or password.' }); }
  if (username === 'admin' && password === 'admin') { return done(null, { username: username}); }
  return done(null, false, { message: 'Incorrect username or password.' });
}));

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

            const CNameUserID = 'userID',
            CNameAccessToken = 'accessToken',
            CNAMEDisplayName = 'displayName',
            cookieAge = 3600 * 8 * 1000; //let cookieAge = 3600*8*1000; default 8 hours

            let expDate = new Date(Date.now() + cookieAge); // do not set sameSite to true, as for safari cookie will not be saved. see https://github.com/expressjs/session/issues/698

            let cookieOpt = {
                maxAge: cookieAge,
                expires: expDate,
                httpOnly: false,
                secure: true,
                sameSite: false
            }; // domain and path use default

            res.cookie(CNameUserID, req.session.user.username, cookieOpt);
            res.cookie(CNAMEDisplayName, req.session.user.username, cookieOpt);
            res.cookie(CNameAccessToken, req.session.id, cookieOpt);
            res.redirect('/'); // ?userID=+req.session.user.username, put it into cookie
          })
        })
      } else {
          res.status(500).send(info.message);
      }
  })(req, res)
})

module.exports = router;
