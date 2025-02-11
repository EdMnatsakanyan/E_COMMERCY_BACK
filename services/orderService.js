const sequelize = require('../configs/sequielize')
const {Op} = require('sequelize')
const Orders = require('../models/orderModel')
const OrderItem = require('../models/orderItemModel')
const Products = require('../models/productModel')
const Cart = require('../models/cartModel')

const createOrder = async(order) => {
    let cart = await Cart.findAll({
        where: {
            id: {
                [Op.in]: order.cart
            }
        }
    })
    if(cart.length < order.cart.length){
        throw {status: 400, message: "invalid cartItem id"}
    }
    cart = cart.map(c => c.dataValues)

    let sum = 0

    for(let i = 0; i < cart.length; i++){
        sum += cart[i].total_price
    }

    let newOrder
    const t = await sequelize.transaction()

    try {
        newOrder = await Orders.create({
            user_id: order.user_id,
            total_price: sum
        }, {transaction: t})

        newOrder = newOrder.dataValues

        for(let i = 0; i < order.cart.length; ++i){
            await OrderItem.create({
                order_id: newOrder.id,
                product_id: cart[i].product_id,
                quantity: cart[i].quantity,
                total_price: cart[i].total_price
            }, {transaction: t})
        }

        await t.commit()

    } catch(err){
        console.log(err)
        await t.rollback()
        throw err
    }

    let addedOrder = await Orders.findOne({
        where: {
            id: newOrder.id
        },
        include: [
            {
                model: OrderItem,
                include: Products
            }
        ]
    })

    return addedOrder.dataValues
}

const getOrders = async() => {
    let orders = await Orders.findAll({
        include: [
            {
                model: OrderItem,
                include: Products
            }
        ]
    })
    orders = orders.map(order => order.dataValues)
    return orders
}

const getUsersOrders = async(user_id) => {
    let orders = await Orders.findAll({
        where: {
            user_id: user_id
        },
        include: [
            {
                model: OrderItem,
                include: Products
            }
        ]
    })
    orders = orders.map(order => order.dataValues)
    return orders
}

module.exports = {
    createOrder,
    getOrders,
    getUsersOrders
}