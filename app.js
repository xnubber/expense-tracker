// express
const express = require('express')
const app = express()
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
// mongoose
require('./config/mongoose')

// routes
const routes = require('./routes')

// tools
const session = require('express-session')
const flash = require('connect-flash')

require('./helpers/handlerbarHelper')
const PORT = process.env.PORT
const errorHandler = require('./helpers/errorHandler')
const methodOverride = require('method-override')
app.use(methodOverride('_method'))
app.use(express.urlencoded({ extended: true }))




// express-handlebars
const exphbs = require('express-handlebars')
app.engine('hbs', exphbs.engine({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// passport
const userPassport = require('./config/passport')

// 
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))
userPassport(app)
app.use(flash())
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.user = req.user
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})


// router
app.use(routes)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`Listening on Port: ${PORT}`)
})