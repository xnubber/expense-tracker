const moment = require('moment')
const Record = require('../models/record')
const Category = require('../models/category')

module.exports.renderNewForm = (req, res) => {
  req.session.returnTo = req.headers.referer
  res.render('new')
}

module.exports.createRecord = async (req, res) => {
  const userId = req.user._id
  const { name, date, amount, category } = req.body
  const findCategory = await Category.findOne({ name: category })
  const categoryId = findCategory._id
  const record = new Record({ name, date, amount, categoryId, userId })
  await record.save()
  req.flash('success_msg', 'Expense has been added.')
  const originalUrl = req.session.returnTo || '/'
  delete req.session.returnTo
  res.redirect(originalUrl)
}

module.exports.renderEditForm = async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const record = await Record.findOne({ _id, userId }).lean().populate('categoryId')
  record.date = moment(record.date).format('YYYY-MM-DD')
  req.session.returnTo = req.headers.referer
  res.render('edit', { record })
}

module.exports.editRecord = async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const { name, date, category, amount } = req.body
  const record = await Record.findOne({ _id, userId })
  const findCategory = await Category.findOne({ name: category })
  const categoryId = findCategory._id
  await record.updateOne({ name, date, categoryId, amount })
  req.flash('success_msg', 'Expense has been updated.')
  const originalUrl = req.session.returnTo || '/'
  delete req.session.returnTo
  res.redirect(originalUrl)
}

module.exports.deleteRecord = async (req, res) => {
  const userId = req.user._id
  const _id = req.params.id
  const record = await Record.findOne({ _id, userId })
  await record.remove()
  res.redirect('/')
}