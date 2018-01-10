'use strict'

const passport = require('passport')
const User = require('../models/user')
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy
const secret = require('../secret/secretFile')
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    done(error, user)
  })
})

passport.use(new GoogleStrategy({
  clientID: secret.google.clientId,
  clientSecret: secret.google.clientSecret,
  callbackURL: 'http://localhost:3000/auth/google/callback',
  passReqToCallback: true
}, (req, accessToken, refreshToken, profile, done) => {
  User.findOne({ google: profile.id }, (error, user) => {
    if (error) {
      return done(error)
    }
    if (user) {
      return done(null, user)
    } else {
      const newUser = new User()
      newUser.google = profile.id
      newUser.fullName = profile.displayName
      newUser.username = profile.displayName
      newUser.email = profile.emails[0].value
      newUser.image = profile._json.image.url
      newUser.save((error) => {
        if (error) {
          return done(error)
        }
        return done(null, newUser)
      })
    }
  })
}
  )
)
