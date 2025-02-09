const sequelize = require('../configs/sequielize')
const { DataTypes } = require("sequelize");

const Order = sequelize.define(
    "orders",
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
                model: 'users',
                key: 'id'
            }
        },
        order_date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        is_done: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        total_price: {
            type: DataTypes.DECIMAL,
            allowNull: false
        }
    }
)

module.exports = Order