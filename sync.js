const {sequelize, createSequelize} = require('./configs/database')
const models = require('./models/index')
const syncSequelize = async() => {
    try {
        await createSequelize()
        await sequelize.sync({alter: true})
        console.log('Synchronizied successfully!')
    } catch(err) {
        console.log(err.stack)
    }
}

module.exports = syncSequelize