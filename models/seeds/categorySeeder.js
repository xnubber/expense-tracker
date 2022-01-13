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
const CATEGORY = [
  {
    name: '家居物業',
    icon: "fas fa-home",
  },
  {
    name: '交通出行',
    icon: "fas fa-shuttle-van",
  },
  {
    name: '休閒娛樂',
    icon: "fas fa-grin-beam",
  },
  {
    name: '餐飲食品',
    icon: "fas fa-utensils",
  },
  {
    name: '其他',
    icon: "fas fa-pen"
  }
]


db.once('open', async () => {
  await Category.deleteMany({})
  for(let i = 0; i < CATEGORY.length; i++) {
    const category = new Category({
      name: CATEGORY[i].name,
      icon: CATEGORY[i].icon
    })
    await category.save()
  }
  process.exit()
})