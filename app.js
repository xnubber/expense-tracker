// express
const express = require('express')
const app = express()
const PORT = 3000

// mongoose
require('./config/mongoose')

// routes
const routes = require('./routes')

// tools
require('./helpers/handlerbarHelper')
const errorHandler = require('./helpers/errorHandler')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.urlencoded({extended: true}))

// express-handlebars
const {engine} = require('express-handlebars')
const { urlencoded } = require('express')
app.engine('hbs', engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// router
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`)
})