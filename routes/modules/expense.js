const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../models/category')
const catchAsync = require('../../helpers/catchAsync')

// create
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', catchAsync(async (req, res) => {
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  const findCategory = await Category.findOne({ name: category })
  const categoryId = findCategory._id
  const record = new Record({ name, date, amount, categoryId, userId })
  await record.save()
  req.flash('success_msg', 'Expense has been added.')
  res.redirect('/')
}))

// update
router.get('/:id/edit', catchAsync(async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const record = await Record.findOne({ _id, userId }).lean().populate('categoryId')
  record.date = moment(record.date).format('YYYY-MM-DD')
  res.render('edit', { record })
}))

router.put('/:id', catchAsync(async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  const record = await Record.findOne({ _id, userId })
  const findCategory = await Category.findOne({ name: category })
  const categoryId = findCategory._id
  await record.updateOne({ name, date, categoryId, amount })
  req.flash('success_msg', 'Expense has been updated.')
  res.redirect('/')
}))

// delete
router.delete('/:id', catchAsync(async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const record = await Record.findOne({ _id, userId })
  await record.remove()
  res.redirect('/')
}))

module.exports = router