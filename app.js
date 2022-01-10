// express
const express = require('express')
const app = express()
const PORT = 3000

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

// express-handlebars
const {engine} = require('express-handlebars')
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// router
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`)
})