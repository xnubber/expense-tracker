const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const catchAsync = require('../../helpers/catchAsync')
const passport = require('passport')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: { type: 'warning_msg', message: 'Invalid username or password.'} }), (req, res) => {
  const username = req.user.username
  req.flash('success_msg', `Welcome! ${username}`)
  res.redirect('/')
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', catchAsync(async (req, res) => {
  try{
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
    req.flash('success_msg', 'Welcome!')
    res.redirect('/')
  } catch(err) {
    req.flash('warning_msg', err.message)
    res.redirect('/users/register')
  }
}))

router.get('/logout', (req, res) => {
  req.flash('success_msg', 'Successfully logout.')
  req.logout()
  res.redirect('/users/login')
})

module.exports = router