const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    budget: {type: Array, default: 
        [
            {category: "Groceries",  budget: 200, spent: 0},
            {category: "Entertainment",  budget: 200, spent: 0},
            {category: "Travel", budget: 300, spent: 0},
            {category: "Rent",  budget: 200, spent: 0},
            {category: "Utilities",  budget: 200, spent: 0},
            {category: "Dining",  budget: 200, spent: 0},
        ]
    }
})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, username: this.username, isAdmin: this.isAdmin}, process.env.MY_WALLET_JWTPRIVATEKEY)
    return token
}   

const User = mongoose.model('User', userSchema)

exports.User = User