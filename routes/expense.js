const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {Expense} = require('../models/expense')
const {User} = require('../models/user')
const {Budget, BudgetYear} = require('../models/budget')
const auth = require('../middleware/auth')
const cors = require('cors')

router.options('/postExpense', cors())
 
router.post('/postExpense', auth, cors(), async (req, res) => {
    
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

    // Find if User Exists
    try {
        const user = await User.findOne({_id: userId})
        if(!user) return res.status(400).send("User not found")
    } catch (error) {
        console.log("Error Finding User")
        res.send(error)
    }
    
    // // Save Expense
    try {
        await expense.save()    
    } catch (error) {
        console.log("Error Saving Expense")
        res.send(error)
    }

    // Create new budget collection if one does not exist
    console.log(year)
    try {
        const budgetYear = new BudgetYear()
        const updateString = "budget." + year 
    
        const exists = await Budget.findOne({userId: userId, [updateString] : {$exists: true }} )
        if(!exists){
            const updateResult = await Budget.updateOne({userId : userId}, {$set : {[updateString] : budgetYear}}, {strict: false})
            console.log(updateResult)
        }
    } catch (error) {
        console.log("Error Modifying and Saving Budget")
        res.send(error)
    }
    
    // Update Budget
    try{    
        
        // Find Previous Spent
        const {budget} = await Budget.findOne({userId: userId})
        const categories = [...budget[year][month]]
        
        let previousSpent
        for (let i = 0; i < categories.length; i++){
            if(categories[i].category === category){
                previousSpent = categories[i].spent
            }
        }
        
        // Update Budget
        const totalSpent = previousSpent + parseInt(amount)
    
        const options = {useFindAndModify: false}
        const queryString = "budget." + year + "." + month + ".category" 
        const updateString = "budget." + year + "." + month + ".$.spent" 
        
        const query = {userId : userId, [queryString] : category}
        const update = {
            $set : { [updateString] : totalSpent }
        }

        const updatedUser = await Budget.findOneAndUpdate(
            query,
            update,
            options 
        )

        res.send(updatedUser)

    } catch (error){
        console.log("Error", error)
        res.send(error)
    }
})

module.exports = router
