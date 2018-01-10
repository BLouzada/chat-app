'use strict'

const passport = require('passport')
const User = require('../models/user')
const FacebookStrategy = require('passport-facebook').Strategy
const secret = require('../secret/secretFile')
passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    done(error, user)
  })
})

passport.use(new FacebookStrategy({
  clientID: secret.facebook.clientId,
  clientSecret: secret.facebook.clientSecret,
  profileFields: ['email', 'displayName', 'photos'],
  callbackURL: 'http://localhost:3000/auth/facebook/callback',
  passReqToCallback: true
}, (req, token, refreshToken, profile, done) => {
  User.findOne({ facebook: profile.id }, (error, user) => {
    if (error) {
      return done(error)
    }
    if (user) {
      return done(null, user)
    } else {
      const newUser = new User()
      newUser.facebook = profile.id
      newUser.fullName = profile.displayName
      newUser.email = profile._json.email
      newUser.userImage = `https://graph.facebook.com/${profile.id}/picture?type=large`
      newUser.fbTokens.push({token: token})
      newUser.save(error => {
        if (error) {
          return done(error)
        }
        return done(null, user)
      })
    }
  })
}
  )
)
