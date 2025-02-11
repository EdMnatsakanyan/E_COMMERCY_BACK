const sequelize = require('../configs/sequielize')
const { DataTypes } = require("sequelize");
const Order = require('./orderModel')
const Products = require('./productModel');
const Users = require('./userModel');

const CartItem = sequelize.define(
    "cart_items",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: Users,
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
Products.hasMany(CartItem, {foreignKey: "product_id"})
CartItem.belongsTo(Products, {foreignKey: "product_id"})

Users.hasMany(CartItem, {foreignKey: "user_id"})
CartItem.belongsTo(Users, {foreignKey: "user_id"})

module.exports = CartItem