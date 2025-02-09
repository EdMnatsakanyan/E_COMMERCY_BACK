const sequelize = require('../configs/sequielize')
const { DataTypes } = require("sequelize");

const Users = sequelize.define(
    "users",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING
        },
        surname: {
            type: DataTypes.STRING
        },
        bio: {
            type: DataTypes.STRING
        }
    }
)

module.exports = Users

