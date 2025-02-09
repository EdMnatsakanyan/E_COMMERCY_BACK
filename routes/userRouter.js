const express = require('express')
const userController = require('../controllers/userController')
const userRouter = express.Router()

userRouter.post('/register', userController.userRegister)
userRouter.post('/login', userController.userLogin)
userRouter.get('/', userController.getAllUsers)
userRouter.get('/:id', userController.getUserById)
userRouter.delete('/:id', userController.deleteUser)

module.exports = userRouter