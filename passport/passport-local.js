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

passport.use(
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
        newUser.password = newUser.encryptPassword(req.body.password)
        newUser.save(err => {
          done(err, newUser)
        })
      })
    }
  )
)
passport.use(
  'local.login', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
  }, (req, email, password, done) => {
    User.findOne({ email: email }, (error, user) => {
      if (error) {
        return done(error)
      }
      const messages = []
      if (!user || !user.validUserPassword(password)) {
        messages.push('Invalid username or password')
        return done(null, false, req.flash('error', messages))
      }
      return done(null, user)
    })
  }
  )
)
