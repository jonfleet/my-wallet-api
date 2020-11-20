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

app.use((req, res, next) => {
        // res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Origin', 'http://quiet-atoll-26675.herokuapp.com/')
        res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
        // Set custom headers for CORS
        res.header("Access-Control-Allow-Headers", "Content-Type,Accept,x-auth-token")
        // req.header('Access-Control-Allow-Origin', "*");
        console.log(response)
        next();
});
app.use(express.json())
app.use(cors({origin: true, credentials: true}))

// Routes

app.use('/', report)
app.use('/', budget)
app.use('/', expense)
app.use('/', user)
app.use('/', auth)


// Server
const port = process.env.PORT || config.get("port")
const server = app.listen(port, () => console.log(`Listening on ${port} ...`))

module.exports = server;