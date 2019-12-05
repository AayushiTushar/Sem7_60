const User = require('../model/User')
const jwt = require('jsonwebtoken')
const secret = process.env.secret || "aayushishah"

const auth = async (req,res,next) => {
    try {
        let token = req.header('Authorization').replace('Bearer ','')
        const decoded = jwt.verify(token, "aayushishah")
        let user = await User.findOne({_id: decoded._id, 'tokens.token': token })
        if(!user)
            throw Error("User Not Found "+token+" "+decoded._id)
        
        req.token = token
        req.user = user
        next()
    } catch (error) {
        res.status(400).send("Please Authorize "+ error)
    }
}

module.exports = auth