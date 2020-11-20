const express = require('express')
const router = express.Router()

const {Budget} = require('../models/budget')
const auth = require('../middleware/auth')
const cors = require('cors')

// router.use(cors)
var corsOptions = {
    origin: "https://mysterious-bayou-32982.herokuapp.com/",
    optionsSuccessStatus: 200
}


router.options('/getBudget', cors())
router.options('/changeBudget', cors())

router.post("/getBudget", auth, cors(corsOptions), async (req,res) => {
    try {
        
        const budget = await Budget.findOne({userId : req.body.userId})
        if(!budget) return res.status(400).send("User not found")

        res.send(budget)
    } catch (ex) {
        res.send(ex)
        console.log("Error: Something went wrong with the Spent Query")
    }
})

router.put("/changeBudget", auth, cors(corsOptions), async (req,res) => {
    console.log(req.body)
    const {userId, activeYear, activeMonth, category, amount} = req.body

    const queryString = 'budget.' + activeYear + '.' + activeMonth + ".category"
    const query = {userId: userId, [queryString] : category}
    const updateString = "budget." + activeYear + "." + activeMonth + ".$.budget"
    const update = { 
        $set: { [updateString] : parseInt(amount)}
    }
    const options = {useFindAndModify: false}
    
    try {
        const updatedUser = await Budget.findOneAndUpdate(query, update, options)
        // console.log(updatedUser)
        if( !updatedUser) return res.status(400).send("User not found")
        res.send(updatedUser)
    } catch (ex) {
        res.send(ex)
        console.log("Something went wrong with the Query", ex)
    }
})

module.exports = router