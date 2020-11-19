const mongoose = require('mongoose')

const categorySchema = [
    {category: 'groceries', spent: 0 , budget: 0},
    {category: 'entertainment', spent: 0 , budget: 0},
    {category: 'travel', spent: 0 , budget: 0},
    {category: 'rent', spent: 0 , budget: 0},
    {category: 'utilities', spent: 0 , budget: 0},
    {category: 'dining', spent: 0 , budget: 0}
]

const budgetYearSchema = mongoose.Schema({
    january: { type: Array, default : categorySchema},
    february: { type: Array, default : categorySchema},
    march: { type: Array, default : categorySchema},
    april: { type: Array, default : categorySchema},
    may: { type: Array, default : categorySchema},
    june: { type: Array, default : categorySchema},
    july: { type: Array, default : categorySchema},
    august: { type: Array, default : categorySchema},
    september: { type: Array, default : categorySchema},
    october: { type: Array, default : categorySchema},
    november: { type: Array, default : categorySchema},
    december: { type: Array, default : categorySchema}
})

const budgetSchema = mongoose.Schema({
    userId: String,
    budget: Object
    // budget : {
    //     "2020" : {
    //         january: { type: Array, default : categorySchema},
    //         february: { type: Array, default : categorySchema},
    //         march: { type: Array, default : categorySchema},
    //         april: { type: Array, default : categorySchema},
    //         may: { type: Array, default : categorySchema},
    //         june: { type: Array, default : categorySchema},
    //         july: { type: Array, default : categorySchema},
    //         august: { type: Array, default : categorySchema},
    //         september: { type: Array, default : categorySchema},
    //         october: { type: Array, default : categorySchema},
    //         november: { type: Array, default : categorySchema},
    //         december: { type: Array, default : categorySchema}
    //     }
    // }
})


const Budget = mongoose.model("Budget", budgetSchema)
const BudgetYear = mongoose.model("BudgetYear", budgetYearSchema)

exports.Budget = Budget
exports.BudgetYear = BudgetYear