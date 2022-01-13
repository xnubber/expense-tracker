const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/expense-tracker')
const db = mongoose.connection

db.on('error', () => {
  console.log('Mongodb error!')
})

db.on('open', () => {
  console.log('Mongodb connected!')
})

const Record = require('../record')
const Category = require('../category')
const User = require('../user')

const SEED_USER = {
  name: 'user1',
  email: 'user1@example.com',
  password: '12345678'
}

db.once('open', async () => {
  await Record.deleteMany({})
  await User.deleteMany({})
  const user = new User({
    name: SEED_USER.name,
    email: SEED_USER.email,
    password: SEED_USER.password
  })
  await user.save()

  const userId = user._id
  const category = await Category.find({})

  for(let i = 0; i < 10; i++) {
    let rand = Math.floor(Math.random() * 5)
    const record = new Record({
      name: `name-${i}`,
      amount: i,
      categoryId: category[rand]._id,
      userId: userId
    })
    await record.save()
  }
  process.exit()
})