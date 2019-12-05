const express = require('express')
const expresslayout = require('express-ejs-layouts')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const session = require('express-session')
const passport = require('passport')

//passport config
require('./config/passport')(passport)

//Variables
const PORT = process.env.PORT || 8000
const IndexRouter = require('./routes/index')
const UserRouter = require('./routes/user')

//Databse
const db = require('./config/keys').MongoURI
mongoose.connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})
.catch( err => console.log(error))

//app
const app = express()

//pasport config
require('./config/passport')(passport)
app.use(expresslayout)
app.set('view engine','ejs')

//Bodyparser
app.use(express.urlencoded({ extended: false }))

//Session
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true
}))

//Passport Middlewars
app.use(passport.initialize())
app.use(passport.session())

//flash messages
app.use(flash())

//common middleware
app.use( (req,res,next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next()
})

app.use('/',IndexRouter)
app.use('/User', UserRouter)

app.listen(PORT, () => {
    console.log(`App is Runnin on ${PORT}`)
})