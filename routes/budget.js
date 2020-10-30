const express = require('express')
const router = express.Router()

const {User} = require('../models/user')
const auth = require('../middleware/auth')
const cors = require('cors')

// router.use(cors)
router.options('/budget', cors())

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

router.put("/changeBudget", auth, cors(), async (req,res) => {
    
    const {catName, catValue, _id} = req.body
    try {
        const update = { ["budget." + catName] : catValue}
        const options= {useFindAndModify: false}
        const user = await User.findByIdAndUpdate({_id: _id}, update, options)
        if( !user) return res.status(400).send("User not found")
        res.send(user)
    } catch (ex) {
        res.send(ex)
        console.log("Something we wrong with the Query")
    }
})


module.exports = router