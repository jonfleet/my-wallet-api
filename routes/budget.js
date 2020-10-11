const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const {Budget} = require('../models/budget')
const cors = require('cors')

// router.use(cors)
router.options('/budget', cors())

router.get("/budget", cors(), async (req,res) => {
    try {
        const result = await Budget.find({})
        // console.log(result) 
        res.send(result)
    } catch (ex){
        res.send([])
        console.log("Error: Something went wrong with the Query")
    }
})


router.put("/budget/changeBudget", cors(), async (req, res) => {
    const {category, budget} = req.body
    
    const result = await Budget.update({category: category}, {budget: budget})
    console.log(result.n)
} )

module.exports = router