'use scritct'
module.exports = function (_, passport) {
  return {
    SetRouting: function (router) {
      router.get('/', this.indexPage)
      router.get('/signup', this.getSignUp)
      router.get('/home', this.homePage)
      router.post('/signup', this.postSignUp)
    },
    indexPage: function (req, res) {
      return res.render('index', { test: 'This is aasdasdasd test' })
    },
    getSignUp: function (req, res) {
      return res.render('signup')
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
