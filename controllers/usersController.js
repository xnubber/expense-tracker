const User = require('../models/user')

module.exports.renderLogin = (req, res) => {
  res.render('login')
}

module.exports.validateLogin = (req, res) => {
  const username = req.user.username
  req.flash('success_msg', `Welcome! ${username}`)
  res.redirect('/')
}

module.exports.renderRegister = (req, res) => {
  res.render('register')
}

module.exports.createUser = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body
    const user = await User.findOne({ email })
    if (user) {
      req.flash('warning_msg', 'User already exists.')
      return res.render('register', { username, email, password, confirmPassword })
    }
    if (password !== confirmPassword) {
      req.flash('warning_msg', 'Password and confirm password must be the same.')
      return res.render('register', { username, email, password, confirmPassword })
    }
    const newUser = new User({ username, email })
    const registerUser = await User.register(newUser, password)
    req.login(registerUser, err => {
      if (err) return next(err)
      req.flash('success_msg', `Welcome! ${registerUser.username}`)
      res.redirect('/')
    })
  } catch (err) {
    req.flash('warning_msg', err.message)
    res.redirect('/users/register')
  }
}

module.exports.logout = (req, res) => {
  req.flash('success_msg', 'Successfully logout.')
  req.logout()
  res.redirect('/users/login')
}