const sequelize = require('../configs/sequielize')
const { DataTypes } = require("sequelize");
const Order = require('./orderModel')
const Products = require('./productModel')

const OrderItem = sequelize.define(
    "order_items",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Order,
                key: "id"
            }
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Products,
                key: "id"
            }
        },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1
        },
        total_price: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
)
Products.hasMany(OrderItem, {foreignKey: "product_id"})
OrderItem.belongsTo(Products, {foreignKey: "product_id"})

Order.hasMany(OrderItem, {foreignKey: "order_id"})
OrderItem.belongsTo(Order, {foreignKey: "order_id"})


module.exports = OrderItem