// express
const express = require('express')
const app = express()
const PORT = 3000

// models
const Record = require('./models/record')
const Category = require('./models/category')

// mongoose
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker')
const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error!')
})

db.on('open', () => {
  console.log('Mongodb connected!')
})

// tools
const moment = require('moment')
app.use(express.urlencoded({extended: true}))

// express-handlebars
const {engine} = require('express-handlebars')
const { urlencoded } = require('express')
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// router
// index
app.get('/', async (req, res) => {
  const {sort} = req.query
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

  if(sortRecords.length === 0 && sortOption === '') {
    sortRecords = null
  } else if (sortRecords.length === 0 && sortOption !== '') {
    console.log('該類別無項目')
    sortRecords = null
  }

  const records = sortRecords ? sortRecords : totalRecords
  totalAmount = totalAmountSort ? totalAmountSort : totalAmount
  
  res.render('index', { records, totalAmount})
})

// create
app.get('/expense/new', (req, res) => {
  res.render('new')
})

app.post('/expense', async (req, res) => {
  const {name, date, amount, category} = req.body
  const findCategory = await Category.findOne({name: category})
  const categoryId = findCategory._id
  const record = new Record({name, date, amount, categoryId})
  await record.save()
  res.redirect('/')
})

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`)
})