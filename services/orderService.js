const sequelize = require('../configs/sequielize')
const Orders = require('../models/orderModel')
const OrderItem = require('../models/orderItemModel')
const Products = require('../models/productModel')

const createOrder = async(order) => {
    let products = await Products.findAll()
    products = products.map(product => product.dataValues)

    let sum = 0 
    for(let i = 0; i < order.products.length; ++i){
        for(let j = 0; j < products.length; ++j){
            if(order.products[i].id === products[j].id){
                sum += order.products[i].quantity * products[j].price
            }
        }
    }
    let newOrder
    const t = await sequelize.transaction()

    try {
        newOrder = await Orders.create({
            user_id: order.user_id,
            total_price: sum
        }, {transaction: t})

        newOrder = newOrder.dataValues

        for(let i = 0; i < order.products.length; ++i){
            const product = products.find(p => p.id === order.products[i].id);
            if(!product) throw new Error('no product with that id')
            
            await OrderItem.create({
                order_id: newOrder.id,
                product_id: order.products[i].id,
                quantity: order.products[i].quantity,
                total_price: product.price * order.products[i].quantity
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