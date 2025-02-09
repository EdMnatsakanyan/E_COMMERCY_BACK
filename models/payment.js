const sequelize = require('../configs/sequielize')
const { DataTypes } = require("sequelize");

const Payments = sequelize.define(
    "payments",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        order_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        date: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        is_successfully: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }
)

module.exports = Payments