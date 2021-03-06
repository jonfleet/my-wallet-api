const express = require('express')
const config = require("config")
const report = require('./routes/report')
const budget = require('./routes/budget')
const expense = require('./routes/expense')
const user = require('./routes/user')
const auth = require('./routes/auth')
const app = express()
const cors = require('cors')
require('dotenv').config()


// database Connection
require("./startup/db")();


// Middleware

// CORS
app.use("*", cors())  
// app.use((req, res, next) => {
//         res.header('Access-Control-Allow-Origin', 'https://whispering-shore-41464.herokuapp.com')
//         next();
// });

// Routes
app.use(express.json())
app.use('/', report)
app.use('/', budget)
app.use('/', expense)
app.use('/', user)
app.use('/', auth)


// Server
const port = process.env.PORT || config.get("port")
const server = app.listen(port, () => console.log(`Listening on ${port} ...`))

module.exports = server;