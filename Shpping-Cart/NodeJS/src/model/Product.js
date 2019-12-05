const mongoose = require('mongoose')

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    price: {
        type: Number,
        required: true,
        validate: function(v) {
            if(v<=0) throw new Error("Invalid Price Value")
        }
    },
    description: {
        type: String,
    },
    image: {
        type: Buffer
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    }
}, {
    timestamps: true
})

const Product = mongoose.model('Product',ProductSchema)

module.exports = Product