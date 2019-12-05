const mongoose = require('mongoose')
const validator = require('validator')
const jwt = require('jsonwebtoken')
const secret = process.env.secret || "aayushishah"

const UserSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: function(v) {
            if(!validator.isEmail(v))
                throw new Error("Invalid Email Address Provided")
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate: function(v) {
            if(v.length > 10 || v.length < 6)
                throw new Error("Password Length must be between 6 to 10")
        }
    },
    type: {
        type: String,
        enum: ['Customer','Admin','Seller'],
        default: 'Admin'
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

UserSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user._id.toString() }, secret)
    user.tokens = user.tokens.concat({token})
    await user.save()
    return token
}

const User = mongoose.model('User', UserSchema)

module.exports = User