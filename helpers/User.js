'use strict'

module.exports = function (_) {
  return {
    SignupValidation: (req, res, next) => {
      req.checkBody('username', 'Username is required').notEmpty()
      req.checkBody('username', 'Username must not be less than 5 characters').isLength({min: 5})
      req.checkBody('email', 'Email is required').notEmpty()
      req.checkBody('email', 'Email is invalid').isEmail()
      req.checkBody('password', 'Password is required').notEmpty()
      req.checkBody('password', 'Password must not be less than 5 characters').isLength({min: 5})
      req.getValidationResult()
        .then((result) => {
          const errors = result.array()
          const messages = []
          errors.forEach((error) => {
            messages.push(error.msg)
          })
          if (messages.length > 0) {
            req.flash('error', messages)
            res.redirect('/signup')
          } else {
            next()
          }
        })
        .catch(next)
    },
    LoginValidation: (req, res, next) => {
      req.checkBody('email', 'Email is required').notEmpty()
      req.checkBody('email', 'Email is invalid').isEmail()
      req.checkBody('password', 'Password is required').notEmpty()
      req.checkBody('password', 'Password must not be less than 5 characters').isLength({min: 5})
      req.getValidationResult()
        .then((result) => {
          const errors = result.array()
          const messages = []
          errors.forEach((error) => {
            messages.push(error.msg)
          })
          if (messages.length > 0) {
            req.flash('error', messages)
            res.redirect('/signup')
          } else {
            next()
          }
        })
        .catch(next)
    }
  }
}
