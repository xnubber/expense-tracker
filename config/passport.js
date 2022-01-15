const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const FacebookStrategy = require('passport-facebook').Strategy
const User = require('../models/user')

module.exports = (app) => {
  app.use(passport.initialize())
  app.use(passport.session())

  passport.use(User.createStrategy())
  passport.use(new FacebookStrategy({
    clientID: process.env.FACEBOOK_ID,
    clientSecret: process.env.FACEBOOK_SECRET,
    callbackURL: process.env.FACEBOOK_CALLBACK,
    profileFields: ['email', 'displayName']
  }, async (accessToken, refreshToken, profile, done) => {
    try {
      const { name, email } = profile._json
      const username = name
      const facebookUser = await User.findOne({ email })
      if (facebookUser) return done(null, facebookUser)
      const randomPassword = Math.random().toString(36).slice(-8)
      const newFBUser = new User({ username, email })
      const registerFBUser = await User.register(newFBUser, randomPassword)
      return done(null, registerFBUser)
    } catch (err) {
      return done(err, false)
    }
  }))
  passport.serializeUser(User.serializeUser())
  passport.deserializeUser(User.deserializeUser())
}