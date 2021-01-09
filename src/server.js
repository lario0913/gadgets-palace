const express = require('express')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const shortid = require('shortid')

const app = express()
app.use(bodyParser)

mongoose.connect('mongodb://localhost/react-shopping-cart-db', {
    useNewUrlParser:true,
    useCreateIndex: true,
    useUnifiedTopology: true
})

// create model for the database by passing the name in the db and the schema.

const Product = mongoose.model(
    "product", 
    new mongoose.Schema({
        id: {
            type: String,
            default: shortid.generate
        },
        title: String,
        image: String,
        description: String,
        price: Number,
        availableColor: [String]
    })
    )

    app.get("api/products", async(req, res) => {
        const products = await Product.find({})
        res.send(products)
    })

    app.post("api/products", async (req, res) => {
        const newProduct = new Product (req.body)
        const savedProduct = await newProduct.saved()
        res.send(savedProduct)
    })

    app.delete("api/products/:id", async(req, res) => {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id)
        res.send(deletedProduct)
    })

    const port = process.env.PORT || 5000
    app.listen(port, () => console.log("server is running"))


