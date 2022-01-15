const express = require('express')
const router = express.Router()
const catchAsync = require('../../helpers/catchAsync')
const home = require('../../controllers/homeController')

router.get('/', catchAsync(home.index))

module.exports = router