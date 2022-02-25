var express = require('express');
var router = express.Router();

var passport = require('passport');
var LocalStrategy = require('passport-local');
var WechatStrategy = require('passport-wechat');

passport.use('login', new LocalStrategy({usernameField: 'username', passwordField: 'password'}, (username, password, done) => {
  if (!username || !password) { return done(null, false, { message: 'No username or password.' }); }
  if (username === 'admin' && password === 'admin') { return done(null, { username: username}); }
  return done(null, false, { message: 'Incorrect username or password.' });
}));

const wechatOption = {
  appID: 'wx02ab63efe14f4313',
  appSecret: process.env.APP_SECRET,
  client: 'web',
  callbackURL: 'http://localhost:8080/pages/authredirect',
  scope: 'snsapi_base',
  state: 'state',
}

passport.use(new WechatStrategy({
  appID: 'wx02ab63efe14f4313',
  name: 'wechat',
  appSecret: process.env.APP_SECRET,
  client: 'web',
  callbackURL: 'http://localhost:8080/pages/authredirect',
  scope: 'snsapi_base',
  state: 'state',
  getToken: function(openid, cb) {cb(null, accessToken)},
  saveToken: function (openid, token, cb) {/*save to db*/ cb(null)}
},function(accessToken, refreshToken, profile, expires_in, done) {
    return done(err,profile);
  }
));

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

// router.get('/login/wechat', passport.authenticate('wechat'), (req, res) => {
//   console.log('req:')
//   console.log(req)
//   console.log('res:')
//   console.log(res)
// });

router.get('/login/wechat', function (req, res) {
  res.status(200).send('https://open.weixin.qq.com/connect/oauth2/authorize?'
                      + 'appid='
                      + wechatOption.appID 
                      + '&redirect_uri=' 
                      + encodeURI(wechatOption.callbackURL)
                      + '&response_type=code'
                      + '&scope=nsapi_base'
                      + '&state=STATE#wechat_redirect')
})

// router.get('/login/wechat', passport.authenticate('wechat'), (req, res) => {
//   console.log('req:')
//   console.log(req)
//   console.log('res:')
//   console.log(res)
// });

router.post('/login', (req, res) => {
  passport.authenticate('login', function (err, user, info) {    
      if (err) {
          return res.status(500).send(err);
      }
      if (user) {
        req.logIn(user, function(err) {
          if (err) { return res.status(500).send(err); }

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
