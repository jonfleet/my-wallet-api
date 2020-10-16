const express = require("express")
const router = express.Router()
const {Expense} = require("../models/expense")
const auth = require('../middleware/auth')
const cors = require('cors')

router.options('/report', cors())

router.get('/report', auth, cors(), async (req, res ) => {
    try{
        const report = await Expense.find()
        // throw Error
        // console.log(report)
        res.send(report)
    } catch (ex){
        res.send([])
        console.log("Error: Something went wrong with the Query")
    }
})

module.exports = router