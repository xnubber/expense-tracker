const express = require('express')
const router = express.Router()
const catchAsync = require('../../helpers/catchAsync')
const passport = require('passport')
const users = require('../../controllers/usersController')

// login
router.get('/login', users.renderLogin)
router.post('/login', passport.authenticate('local', { failureRedirect: '/users/login', failureFlash: { type: 'warning_msg', message: 'Invalid username or password.' }}), users.validateLogin)

// register
router.get('/register', users.renderRegister)
router.post('/register', catchAsync(users.createUser))
router.get('/logout', users.logout)

module.exports = router