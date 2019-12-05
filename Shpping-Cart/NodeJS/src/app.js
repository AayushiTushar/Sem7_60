const express = require('express')
const bodyparser = require('body-parser')
const cors = require('cors')

const mongoose = require('./db/db')
const ProductRouter = require('./router/ProductRouter')
const CategoryRouter = require('./router/CategoryRouter')
const UserRouter = require('./router/UserRouter')

const PORT = process.env.PORT || 8080

const app = express()
app.use(cors())
app.use(bodyparser.urlencoded({extended:false}))
app.use(bodyparser.json())

app.use('/Product',ProductRouter)
app.use('/Category',CategoryRouter)
app.use('/User', UserRouter)

app.listen(PORT, () => {
    console.log(`Application is running on ${PORT}`)
})