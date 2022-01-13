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
    icon: "https://fontawesome.com/icons/home?style=solid",
  },
  {
    name: '交通出行',
    icon: "https://fontawesome.com/icons/shuttle-van?style=solid",
  },
  {
    name: '休閒娛樂',
    icon: "https://fontawesome.com/icons/grin-beam?style=solid",
  },
  {
    name: '餐飲食品',
    icon: "https://fontawesome.com/icons/utensils?style=solid",
  },
  {
    name: '其他',
    icon: "https://fontawesome.com/icons/pen?style=solid"
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