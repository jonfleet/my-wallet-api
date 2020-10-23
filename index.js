const express = require('express')
const config = require("config")
const mongoose = require('mongoose')
const report = require('./routes/report')
const budget = require('./routes/budget')
const expense = require('./routes/expense')
const user = require('./routes/user')
const auth = require('./routes/auth')
const app = express()
const cors = require('cors')
const config = require('config')


// database Connection
require("./startup/db")();


// Middleware

// app.use(cors)
// app.use((req, res, next) => {
//         // res.header('Access-Control-Allow-Origin', 'http://localhost:3700');
//         res.header('Access-Control-Allow-Origin', '*');
//         // req.header('Access-Control-Allow-Origin', "*");
//         next();
// });

// routes
app.use(express.json())
app.use('/', report)
app.use('/', budget)
app.use('/', expense)
app.use('/', user)
app.use('/', auth)
console.log("Index.js Logs of jwtPrivateKey", config.get('jwtPrivateKey'))

// Server
const port = process.env.PORT || config.get("port")
const server = app.listen(port, () => console.log(`Listening on ${port}...`))

module.exports = server;