const Category = require('../model/Category')
const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

router.get('/', async (req,res) => {
    try {
        let categories = await Category.find()
        res.status(200).send(categories)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.post('/', async (req,res) => {
    let cat = new Category(req.body)
    try {
        await cat.save()
        res.status(201).send(cat)
    }
    catch(error) {
        res.status(400).send(error)
    }
})
router.put('/:id', async (req,res) => {
    if(!mongoose.Types.ObjectId.isValid(`${req.params.id}`))
        return res.status(400).send("Invalid id Provided")
    try {
        let cat = await Category.findById(req.params.id)
        if(req.body.name)
            cat.name = req.body.name
            await cat.save()
        res.status(200).send(cat)
    } catch (error) {
        res.status(400).send(error)
    }
})
router.delete('/:id', async (req,res) => {
    if(!mongoose.Types.ObjectId.isValid(`${req.params.id}`))
        return res.status(400).send("Invalid id Provided")
    try {
        let cat = await Category.findByIdAndDelete(req.params.id)
        res.status(200).send(cat)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router