const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    // budget: {type: Array, default: [
    //         {category: "Groceries",  budget: 200, spent: 0},
    //         {category: "Entertainment",  budget: 200, spent: 0},
    //         {category: "Travel", budget: 300, spent: 0},
    //         {category: "Rent",  budget: 200, spent: 0},
    //         {category: "Utilities",  budget: 200, spent: 0},
    //         {category: "Dining",  budget: 200, spent: 0},
    //     ]},
    // budget: { 
    //     groceries: {type: Number, default: 0},
    //     entertainment: {type: Number, default: 0},
    //     travel: {type: Number, default: 0},
    //     rent: {type: Number, default: 0},
    //     utilities: {type: Number, default: 0},
    //     dining: {type: Number, default: 0} 
    // }, 
    // spent: { 
    //     groceries: {type: Number, default: 0},
    //     entertainment: {type: Number, default: 0},
    //     travel: {type: Number, default: 0},
    //     rent: {type: Number, default: 0},
    //     utilities: {type: Number, default: 0},
    //     dining: {type: Number, default: 0} 
    // }
})

// userSchema.add({ String})

userSchema.methods.generateAuthToken = function(){
    const token = jwt.sign({_id: this._id, username: this.username, isAdmin: this.isAdmin}, process.env.MY_WALLET_JWTPRIVATEKEY)
    return token
}   

const User = mongoose.model('User', userSchema)

exports.User = User