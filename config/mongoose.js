const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost:27017/expense-tracker')
const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error!')
})

db.on('open', () => {
  console.log('Mongodb connected!')
})

module.exports = db