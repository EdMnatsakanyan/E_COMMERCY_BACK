const cartService = require('../services/cartService')

const addProductToCart = async(req, res) => {
    const {product_id} = req.body
    if(!product_id){
        return res.status(400).json({message: "need product id"})
    }
    try{
        const cartItem = await cartService.addToCart(req.user.id, product_id)

        return res.status(201).json({cart_item: cartItem})
    } catch(err){
        console.log(err.stack)
        return res.status(
            err.status || 500
        ).json({
            message: err.message || "something went wrong"
        })
    }
}

const getUsersCart = async(req, res) => {
    try {
        const cart = await cartService.readUsersCart(req.user.id)
        return res.status(200).json(cart)
    } catch(err){
        console.log(err.stack)
        return res.status(500).json({message: "something went wrong"})
    }
}

module.exports = {
    addProductToCart,
    getUsersCart
}