const db = require('../../config/mongoose')

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

  for(let i = 0; i < 5; i++) {
    let rand = Math.floor(Math.random() * 5)
    const record = new Record({
      name: `name-${i}`,
      amount: i + 1,
      date: Date.now(),
      categoryId: category[rand]._id,
      userId: userId
    })
    await record.save()
  }
  console.log('recordSeeder done')
  process.exit()
})