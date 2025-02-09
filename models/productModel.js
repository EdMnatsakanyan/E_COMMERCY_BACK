const sequelize = require('../configs/sequielize')
const { DataTypes } = require("sequelize")

const Products = sequelize.define(
    "products",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        description: {
            type: DataTypes.STRING,
        },
        price : {
            type: DataTypes.DECIMAL,
            allowNull: false
        },
        category: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }
)



module.exports = Products