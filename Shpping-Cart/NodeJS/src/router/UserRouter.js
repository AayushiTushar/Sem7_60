const User = require('../model/User')
const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

router.get('/', async (req,res) => {
    try {
        let users = await User.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', async (req,res) => {
    try {
        let user = new User(req.body)
        await user.generateAuthToken()
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.patch('/:id', auth, async (req,res) => {
    let editItems = Object.keys(req.body)
    try {
        editItems.every( (param) => req.user[param] = req.body[param] )
        await req.user.save()
        res.status(200).send(req.user)
    }
    catch(error) {
        res.status(400).send(error)
    }
})

router.delete('/:id', auth, async (req,res) => {
    try {
        let user = await User.findByIdAndDelete(req.params.id)
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/login', async (req,res) => {
    try {
        let user = await User.findOne({ email: req.body.email, password: req.body.password })
        if(!user)
            return res.status(404).send("User Not Found")
        res.status(200).send(user)
    } catch (error) {
        res.status(400).send(error)
    }
})
module.exports = router