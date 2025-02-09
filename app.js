const express = require('express')
const settings = require('./configs/settings')
const syncSequelize = require('./sync')

const userRouter = require('./routes/userRouter')
const orderRouter = require('./routes/orderRoutes')
const productRouter = require('./routes/productRoutes')

syncSequelize()

const app = express()
app.use(express.json())

app.use('/auth', userRouter)
app.use('/orders', orderRouter)
app.use('/products', productRouter)

app.listen(settings.app_port, () => {
    console.log(`app started on port ${settings.app_port}`)
})