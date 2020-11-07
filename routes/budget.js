const express = require('express')
const router = express.Router()

const {User} = require('../models/user')
const {Budget} = require('../models/budget')
const auth = require('../middleware/auth')
const cors = require('cors')

// router.use(cors)
router.options('/spent', cors())
router.options('/budget', cors())
router.options('/changeBudget', cors())


router.post("/budget", auth,  cors(), async (req,res) => {
    try {
        const user = await User.findOne({_id : req.body._id})
        if(!user) return res.status(400).send("User not found")
        const budget = user.budget
        res.send(budget)
    } catch (ex){
        res.send([])
        console.log("Error: Something went wrong with the Query")
    }
})

router.post("/spent", auth, async (req,res) => {
    try {
        const budget = await Budget.findOne({userId : req.body.userId})
        if(!budget) return res.status(400).send("User not found")

        res.send(budget)
    } catch (ex) {
        res.send(ex)
        console.log("Error: Something went wrong with the Spent Query")
    }
})

router.put("/changeBudget", auth, cors(), async (req,res) => {
    console.log("reqeust: ",req.body)
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