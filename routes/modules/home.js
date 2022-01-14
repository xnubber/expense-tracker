const express = require('express')
const router = express.Router()
const moment = require('moment')
const Record = require('../../models/record')
const Category = require('../../models/category')
const catchAsync = require('../../helpers/catchAsync')

router.get('/', catchAsync(async (req, res) => {
  const { sort } = req.query
  let sortOption = ''
  switch (sort) {
    case '家居物業':
      sortOption = '家居物業'
      break
    case '交通出行':
      sortOption = '交通出行'
      break
    case '休閒娛樂':
      sortOption = '休閒娛樂'
      break
    case '餐飲食品':
      sortOption = '餐飲食品'
      break
    case '其他':
      sortOption = '其他'
      break
  }

  let totalAmountSort = 0
  let totalAmount = 0

  const totalRecords = await Record.find({})
    .lean()
    .populate('categoryId')

  totalRecords.forEach(record => {
    record.date = moment(record.date).format('YYYY/MM/DD')
    record.category = record.categoryId.name
    totalAmount += record.amount
  })

  let sortRecords = totalRecords.filter(record => sortOption === record.category)

  sortRecords.forEach(record => {
    totalAmountSort += record.amount
  })

  if (sortRecords.length === 0 && sortOption === '') {
    sortRecords = null
  } else if (sortRecords.length === 0 && sortOption !== '') {
    console.log('該類別無項目')
    sortRecords = null
  }

  const records = sortRecords ? sortRecords : totalRecords
  totalAmount = totalAmountSort ? totalAmountSort : totalAmount

  res.render('index', { records, totalAmount })
}))

module.exports = router