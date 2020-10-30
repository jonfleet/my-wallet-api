const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {Expense} = require('../models/expense')
const auth = require('../middleware/auth')
const admin = require('../middleware/admin')
const cors = require('cors')


// Send an error back to the client if the expense cannot be saved

router.options('/postExpense', cors())

router.post('/postExpense', cors(), async (req, res) => {
    // console.log(req.body)
    const { userId, description, category, month, day, year, amount, account} = req.body
    const expense = new Expense({
        userId: userId,
        description: description,
        category: category,
        month: month,
        day: day,
        year: year,
        amount: amount,
        account: account        
    })
    try{
        // throw Error
        await expense.save()
        res.send("Report Sent")
    } catch (ex){
        console.log("Error Saving Item to the database")
        res.send(ex)
    }
    
})

module.exports = router
