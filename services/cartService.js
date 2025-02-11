const { where, NUMBER } = require('sequelize')
const CartItem = require('../models/cartModel')
const Products = require('../models/productModel')

const addToCart = async(userId, productId) => {
    const findedProduct = await Products.findByPk(productId)

    if(!findedProduct){
        throw {status: 400, message: "no product with that id"}
    }

    const findedCart = await CartItem.findOne({
        where: {product_id: productId}
    })

    
    if(!findedCart){
        return await CartItem.create({
            user_id: userId,
            product_id: productId,
            quantity: 1,
            total_price: findedProduct.dataValues.price
        })
    }

    
    await CartItem.update(
        {quantity: findedCart.dataValues.quantity + 1,
        total_price: Number(findedCart.dataValues.total_price) + Number(findedProduct.dataValues.price)},
        {where: {id: findedCart.dataValues.id}}
    )

    return await CartItem.findByPk(findedCart.dataValues.id)
}

const readUsersCart = async(userId) => {
    let cart = await CartItem.findAll({
        where: {user_id: userId},
        include: [
            {
                model: Products
            }
        ]
    })
    cart = cart.map(cartItem => cartItem.dataValues)

    return cart
}

module.exports = {
    addToCart,
    readUsersCart
}