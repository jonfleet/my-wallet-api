const mongoose = require('mongoose')


const budgetSchema = mongoose.Schema({
    category: String,
    spent: Number,
    budget: Number
})


// const budget = [
//     // Add info from database
//     {category: "Groceries", spent: 100, budget: 200},
//     {category: "Entertainment", spent: 10, budget: 100},
//     {category: "Travel", spent: 200, budget: 200},
//     {category: "Rent", spent: 875, budget: 900},
//     {category: "Utilities", spent: 100, budget: 200},
//     {category: "Dining", spent: 50, budget: 500},
// ]


const Budget = mongoose.model('Budget', budgetSchema)
// const budget = new Budget({
//     category: "Dining",
//     spent: 50,
//     budget: 500
// })

// budget.save()

exports.Budget = Budget;