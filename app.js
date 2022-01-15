// express
const express = require('express')
const app = express()
const PORT = 3000

// mongoose
require('./config/mongoose')

// routes
const routes = require('./routes')

// tools
const session = require('express-session')
const flash = require('connect-flash')
require('./helpers/handlerbarHelper')
const errorHandler = require('./helpers/errorHandler')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))




// express-handlebars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// 
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))
app.use(flash())
app.use((req, res, next) => {
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})


// router
app.use(routes)
// app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`)
})