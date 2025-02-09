const productService = require('../services/productService')

const getAllProducts = async(req, res) => {
    try {
        const products = await productService.readAllProducts()
        return res.status(200).json(products)
    } catch(err) {
        console.log(err)
        return res.status(500).json({message: "something went wrong"})
    }
}

const addProduct = async(req, res) => {
    const {title, description, price, category} = req.body

    if(!title || title.length < 3){
        return res.status(400).json({message: "wrong title format"})
    } else if(!price || price < 0){
        return res.status(400).json({message: "wrong price format"})
    } else if(!category || category.length < 3){
        return res.status(400).json({message: "wrong category format"})
    }

    try {
        const product = await productService.createProduct({
            title,
            description,
            price,
            category
        })
        return res.status(201).json(product)
    } catch(err) {
        if(err.message === 'already exists'){
            return res.status(400).json({message: "product with that title already exists"})
        }
        console.log(err.stack)
        return res.status(500).json({message: "something went wrong"})
    }
}

module.exports = {
    getAllProducts,
    addProduct
}