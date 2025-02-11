const express = require('express')
const cartController = require('../controllers/cartController')
const cartRouter = express.Router()
const auth = require('../middlewairs/auth')

cartRouter.post('/', auth, cartController.addProductToCart)
cartRouter.get('/', auth, cartController.getUsersCart)

module.exports = cartRouter