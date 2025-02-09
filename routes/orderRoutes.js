const express = require('express')
const auth = require('../middlewairs/auth')
const orderController = require('../controllers/orderController')
const orderRouter = express.Router()

orderRouter.post('/', auth, orderController.addOrder)
orderRouter.get('/', auth, orderController.findAllOrders)
orderRouter.get('/authUsers', auth, orderController.findOrdersByUserId)

module.exports = orderRouter
