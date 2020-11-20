const _ = require('lodash')
const express = require('express')
const router = express.Router()
const {User} = require("../models/user")
const {Budget, BudgetYear } = require('../models/budget')
const hashPassword = require('../util/hash')
const cors = require('cors')

var corsOptions = {
    origin: "https://mysterious-bayou-32982.herokuapp.com/",
    optionsSuccessStatus: 200
}

router.options('/createUser', cors())

router.post('/createUser', cors(corsOptions), async (req, res) => {
    
    try {
        let user = await User.findOne({username: req.body.username})
        if(user) return res.status(400).send('User already registered.')
        
        // Create User Document
        user = new User ({
            username : req.body.username,
            password : await hashPassword(req.body.password)
        }, {strict : false})
        await user.save()

        // Create new Budget Year
        budgetYear = new BudgetYear({})

        // Create New Budget
        budget = new Budget ({
            userId : user._id,
            budget : {}
        })

        await budget.save() 

        const token = user.generateAuthToken();
        res
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(_.pick(user, ["username", "password", "_id"]))

    } catch (er){
        console.log("Error saving user or spent document.", er) 
        res.send(er.message)
    }  
})

module.exports = router