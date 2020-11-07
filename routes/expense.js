const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()
const {Expense} = require('../models/expense')
const {User} = require('../models/user')
const {Budget, BudgetYear} = require('../models/budget')
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
        
        const user = await User.findOne({_id: userId})
        
        if(!user) return res.status(400).send("User not found")
        
        // Update Budget
        const {budget} = await Budget.findOne({userId: userId})
        
        const categories = [...budget[year][month]]
       
        let previousSpent
        for (let i = 0; i < categories.length; i++){
            if(categories[i].category === category){
                previousSpent = categories[i].spent
            }
        }
        
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

    } catch (ex){
        console.log("Query Error", ex)
        res.send(ex)
    }
    
})

module.exports = router
