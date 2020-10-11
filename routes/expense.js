const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {Expense} = require('../models/expense')
const cors = require('cors')

// Send an error back to the client if the expense cannot be saved

router.options('/postExpense', cors())

router.post('/postExpense', cors(), async (req, res) => {
    // console.log(req.body)
    const { description, category, date, amount, account} = req.body
    const expense = new Expense({
        description: description,
        category: category,
        date: date,
        amount: amount,
        account: account        
    })
    try{
        // throw Error
        const result = await expense.save()
        console.log("Result is:", result)
        res.send(console.log("Sucess: Item Logged"))
    } catch (ex){
        console.log("Error Saving Item to the database")
        res.send(ex)
    }
    
})

module.exports = router
