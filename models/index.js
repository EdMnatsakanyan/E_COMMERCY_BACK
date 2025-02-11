const Users = require('./userModel')
const Products = require('./productModel')
const Order = require('./orderModel')
const OrderItem = require('./orderItemModel')
const Payments = require('./payment')
const CartItem = require('./cartModel')


module.exports = {
    Users,
    Products,
    Order,
    OrderItem,
    CartItem
}