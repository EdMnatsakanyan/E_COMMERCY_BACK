const Orders = require('../models/orderModel')
const orderService = require('../services/orderService')

const addOrder = async(req, res) => {
    const cartItems = req.body.cartItems

    if(!Array.isArray(cartItems)){
        return res.status(400).json({message: "products must be array"})
    }

    try {
        const order = await orderService.createOrder({
            user_id: req.user.id,
            cart: cartItems
        })
        return res.status(201).json(order)
    } catch(err){
        console.log(err.stack)
        return res.status(
            err.status || 500
        ).json({
            message: err.message || "something went wrong"
        })
    }
}

const findAllOrders = async(req, res) => {
    let orders
    try {
        orders = await orderService.getOrders()
        return res.status(200).json(orders)
    } catch(err) {
        console.log(err)
        return res.status(400).json({message: 'something went wrong'})
    }
}

const findOrdersByUserId = async(req, res) => {
    let orders
    try {
        orders = await orderService.getUsersOrders(req.user.id)
        return res.status(200).json(orders)
    } catch(err) {
        console.log(err.stack)
        return res.status(500).json({message: "something went wrong"})
    }
}



module.exports = {
    addOrder,
    findAllOrders,
    findOrdersByUserId
}