const Products = require('../models/productModel')

const readAllProducts = async() => {
    let products = await Products.findAll()
    products = products.map(product => product.dataValues)

    return products
}

const readProductById = async(id) => {
    let product = await Products.findOne({
        where: {
            id: id
        }
    })
    product = product.dataValues
    return product.dataValues
}

const createProduct = async(product) => {
    const {title, description, price, category} = product

    let finded = await Products.findOne({
        where: {
            title: title
        }
    })
    
    if(finded){
        throw new Error('already exists')
    }

    let newProduct = await Products.create({
        title,
        description,
        price,
        category
    })

    return newProduct.dataValues
}

module.exports = {
    readAllProducts,
    createProduct
}