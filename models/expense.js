const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({ 
    userId: String,
    description: String,
    category: String,
    // date: {type: Date, default: Date.now},
    month: String,
    day: String,
    year: Number,
    amount: Number,
    account: String,
})

const Expense = mongoose.model("Expense", reportSchema )

exports.Expense = Expense;