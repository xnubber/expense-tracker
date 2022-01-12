const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker')
const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error!')
})

db.on('open', () => {
  console.log('Mongodb connected!')
})

const Category = require('../category')
const categories = ['家居物業', '交通出行', '休閒娛樂', '餐飲食品', '其他']

db.once('open', async () => {
  await Category.deleteMany({})
  for(let i = 0; i < categories.length; i++) {
    const category = new Category({
      name: categories[i]
    })
    await category.save()
  }
  process.exit()
})