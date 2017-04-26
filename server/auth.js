function setupAuth(User, app) {
  var passport = require('passport');
  var FacebookStrategy = require('passport-facebook').Strategy;
  // var callback_base = process.env.LOCAL_CALLBACK_URL;
  var callback_base = process.env.CALLBACK_URL;

  //Passport serializes and deserializes user instances to and from the login session.
  //in this case only using _id to keep the cookie small.
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.
      findOne({ _id : id }).
      exec(done);
  });

  // Facebook-specific
  passport.use(new FacebookStrategy(
    {
      clientID: process.env.facebookClientId,
      clientSecret: process.env.facebookClientSecret,
      callbackURL: callback_base + 'auth/facebook/callback',
      profileFields: ['id', 'email', 'name']
    },
    function(accessToken, refreshToken, profile, done) {
      if (!profile.emails || !profile.emails.length) {
        return done('No emails associated with this account!');
      }
      console.log('accessToken', 'refreshToken', accessToken, refreshToken);
      User.findOneAndUpdate(
        { 'data.oauth': profile.id },
        {
          $set: {
            'profile.username': profile.emails[0].value,
            'profile.picture': 'http://graph.facebook.com/' +
              profile.id.toString() + '/picture?type=large'
          }
        },
        { 'new': true, upsert: true, runValidators: true },
        function(error, user) {
          done(error, user);
        });
    }));

  // Express middlewares
  app.use(require('express-session')({
    secret: 'this is a secret',
    resave: false,
    saveUninitialized: false
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  // Express routes for auth
  app.get('/auth/facebook',
    function(req, res, next) {
      var redirect = encodeURIComponent(req.query.redirect || '/');

      passport.authenticate('facebook',
        {
          scope: ['email'],
          callbackURL: callback_base + 'auth/facebook/callback?redirect=' + redirect
        })(req, res, next);
    });

  app.get('/auth/facebook/callback',
    function(req, res, next) {
      var url = callback_base + 'auth/facebook/callback?redirect=' +
        encodeURIComponent(req.query.redirect);
      passport.authenticate('facebook', { callbackURL: url })(req, res, next);
    },
    function(req, res) {
      res.redirect(req.query.redirect);
      //res.send('Welcome, ' + req.user.profile.username);
      //res.redirect('/api/v1/me');
    });
}

module.exports = setupAuth;
