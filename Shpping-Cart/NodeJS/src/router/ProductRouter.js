const express =require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const sharp = require('sharp')

const router = express.Router()
const Product = require('../model/Product')

const upload = multer({
    limits: {
        fileSize: 1000000
    },
    fileFilter(req,file,cb) {
        if(!file.originalname.match(/\.(jpeg|jpg|png)$/)) {
            return cb(new Error('Please Select Image for Product'))
        }
        cb(undefined,true)
    }
})

router.get('/', async (req,res) => {
    try {
        let products = await Product.find()
        res.status(200).send(products)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/:id', async (req,res) => {
    try {
        let product = await Product.findById(req.params.id)
        res.status(200).send(product)
    } catch (error) {
        res.status(404).send(error)
    }
})

router.post('/', async (req,res) => {
    // const buffer = await sharp(req.file.buffer).resize({width: 250,height:250}).png().toBuffer()
    // upload.single('image'),
    //req.body.category = mongoose.Types.ObjectId(req.body.category)
    let product = new Product(req.body)
    product.category = mongoose.Types.ObjectId(req.body.category)
    console.log(product)
    //product.image = buffer
    try {
        await product.save()
        res.status(201).send(Product)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.put('/:id', async (req,res) => {
    //upload.single('image'),
    if(!mongoose.Types.ObjectId.isValid(`${req.params.id}`)) {
        return res.status(500).send("Invalid id Provided")
    }

    let validParams = ['name','price', 'description', 'image', 'category']
    let updateParams = Object.keys(req.body)
    let valid = updateParams.every( param => validParams.includes(param) )
    if(!valid){
        res.status(400).send("Invalid Updates Provided")
    }
    
    try {
        let prod = await Product.findById(req.params.id)
        if(!prod)
            return res.status(400).send("Product Not Found")

        updateParams.forEach( param => {
            if(param != "image")
                prod[param] = req.body[param]
        })
        if(updateParams.includes('image')){
            prod.image = await sharp(req.file.buffer).resize({width: 250,height:250}).png().toBuffer()
        }
        await prod.save()
        res.status(200).send(prod)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.delete('/:id', async (req,res) => {
    if(!mongoose.Types.ObjectId.isValid(`${req.params.id}`))
        return res.status(500).send("Invalid id Provided")
    
    try {
        let prod = await Product.findByIdAndDelete(req.params.id)
        res.status(200).send(prod)
    } catch (error) {
        res.status(400).send(error)
    }
})

module.exports = router