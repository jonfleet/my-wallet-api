const _ = require('lodash')
const express = require('express')
const router = express.Router()
const {User} = require("../models/user")
const hashPassword = require('../util/hash')
const cors = require('cors')
const jwt = require('jsonwebtoken')

router.options('/createUser', cors())

router.post('/createUser', cors(), async (req, res) => {
    // try {
        let user = await User.findOne({username: req.body.username})
        if(user) return res.status(400).send('User already registered.')
        
        user = new User ({
            username : req.body.username,
            password : await hashPassword(req.body.password)
        })

        await user.save()

        const token = user.generateAuthToken();
        res
            .header("x-auth-token", token)
            .header("access-control-expose-headers", "x-auth-token")
            .send(_.pick(user, ["username", "password"]))

    // } catch (er){
    //     console.log("Error")
    //     res.send(er.message)
    // }  
})

module.exports = router