const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({ 
    month: String,
    description: String,
    category: String,
    // date: {type: Date, default: Date.now},
    date: String,
    amount: Number,
    account: String,
})

const Expense = mongoose.model("Expense", reportSchema )

exports.Expense = Expense;