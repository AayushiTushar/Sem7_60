const mongoose = require('mongoose')

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        trim: true,
        unique: true,
    },
    seller: {
        type: Number,
    }
})

CategorySchema.virtual('products', {
    ref: 'Product',
    localField: '_id',
    foreignField: 'category'
})

const Category = mongoose.model('Category', CategorySchema)

module.exports = Category;