const express = require('express')
const settings = require('./configs/settings')
const syncSequelize = require('./sync')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const userRouter = require('./routes/userRouter')
const orderRouter = require('./routes/orderRoutes')
const productRouter = require('./routes/productRoutes')
const cartRouter = require('./routes/cartRoutes')

syncSequelize()

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())

app.use('/auth', userRouter)
app.use('/orders', orderRouter)
app.use('/products', productRouter)
app.use('/cart', cartRouter)

app.listen(settings.app_port, () => {
    console.log(`app started on port ${settings.app_port}`)
})