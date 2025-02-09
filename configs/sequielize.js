const {Sequelize} = require('sequelize')
const settings = require('./settings')

const sequelize = new Sequelize( settings.database, settings.username, settings.password, {
    host: settings.host,
    dialect: settings.dialect,
    logging: false
})

module.exports = sequelize