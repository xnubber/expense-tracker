const express = require('express')
const router = express.Router()
const User = require('../../models/user')
const catchAsync = require('../../helpers/catchAsync')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', (req, res) => {
})

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', catchAsync(async (req, res) => {
  const { name, email, password, confirmPassword } = req.body
  const user = await User.findOne({email})
  if (user) {
    req.flash('warning_msg', 'User already exists.')
    return res.render('register', { name, email, password, confirmPassword})
  }
  if (password !== confirmPassword) {
    req.flash('warning_msg', 'Password and confirm password must be the same.')
    return res.render('register', { name, email, password, confirmPassword })
  }
  const newUser = new User({name, email, password})
  await newUser.save()
  res.redirect('/')
}))
module.exports = router