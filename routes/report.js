const express = require("express")
const router = express.Router()
const {Expense} = require("../models/expense")
const auth = require('../middleware/auth')
const cors = require('cors')

router.options('/report', cors())

router.post('/report', cors(), async (req, res ) => {
    try{
        const report = await Expense.find({userId: req.body.userId})
        // console.log(req.headers)
        res.send(report)
    } catch (ex){
        res.status(404).send(ex)
        console.log("Error: Something went wrong with the Query", ex)
    }
})

module.exports = router