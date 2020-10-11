const _ = require('lodash')
const express = require('express')
const router = express.Router()
const {User} = require("../models/user")
const hashPassword = require('../util/hash')
const cors = require('cors')

router.options('/users', cors())

router.post('/users', cors(), async (req, res) => {
    try {
        let user = await User.findOne({username: req.body.username})
        if(user) return res.status(400).send('User already registered.')

        // user = new User ({
        //     username: req.body.username,
        //     password: req.body.password
        // })

        user = new User ({
            username : req.body.username,
            password : await hashPassword(req.body.password)
        })

        await user.save()
        res.send(_.pick(user, ["username", "password"]))

    } catch (er){
        console.log("Error")
        res.send(er.message)
    }  
})

module.exports = router