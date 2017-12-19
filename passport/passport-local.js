'use strict'

const passport = require('passport')
const User = require('../models/user')
const LocalStrategy = require('passport-local').Strategy

passport.serializeUser((user, done) => {
  done(null, user.id)
})

passport.deserializeUser((id, done) => {
  User.findById(id, (error, user) => {
    done(error, user)
  })
})

passport.user(
  'local.signup',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true
    },
    (req, email, password, done) => {
      User.findOne({ email: email }, (error, user) => {
        if (error) {
          return done(error)
        }
        if (user) {
          return done(
            null,
            false,
            req.flash('error', 'User with email alredy exist')
          )
        }
        const newUser = new User()
        newUser.username = req.body.username
        newUser.email = req.body.email
        newUser.password = newUser.encryptPassowd(req.body.password)
        newUser.save(err => {
          done(err, newUser)
        })
      })
    }
  )
)
