const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../models/category')

// create
router.get('/new', (req, res) => {
  res.render('new')
})

router.post('/', async (req, res) => {
  const { name, date, amount, category } = req.body
  const findCategory = await Category.findOne({ name: category })
  const categoryId = findCategory._id
  const record = new Record({ name, date, amount, categoryId })
  await record.save()
  res.redirect('/')
})

// update
router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  const record = await Record.findOne({ _id }).lean().populate('categoryId')
  record.date = moment(record.date).format('YYYY-MM-DD')
  res.render('edit', { record })
})

router.put('/:id', async (req, res) => {
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  const record = await Record.findOne({ _id })
  const findCategory = await Category.findOne({ name: category })
  const categoryId = findCategory._id
  await record.updateOne({ name, date, categoryId, amount })
  res.redirect('/')
})

// delete
router.delete('/:id', async (req, res) => {
  const _id = req.params.id
  const record = await Record.findOne({ _id })
  await record.remove()
  res.redirect('/')
})

module.exports = router