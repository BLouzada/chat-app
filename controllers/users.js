'use scritct'
module.exports = function (_, passport, User) {
  return {
    SetRouting: function (router) {
      router.get('/', this.indexPage)
      router.get('/signup', this.getSignUp)
      router.get('/home', this.homePage)
      router.post('/signup', User.SignupValidation, this.postSignUp)
    },
    indexPage: function (req, res) {
      return res.render('index', { test: 'This is aasdasdasd test' })
    },
    getSignUp: function (req, res) {
      const errors = req.flash('error')
      return res.render('signup', {title: 'Chat-App | Login', messages: errors, hasErrors: errors.length > 0})
    },
    homePage: function (req, res) {
      return res.render('home')
    },
    postSignUp: passport.authenticate('local.signup', {
      successRedirect: '/home',
      failureRedirect: '/signup',
      failureFlash: true
    })
  }
}
