const sequelize = require('./sequielize')
const settings = require('./settings')
const ensuresDatabaseExists = require('./connection')



const createSequelize = async() => {
    await ensuresDatabaseExists()
    
    try{
        await sequelize.authenticate()
        console.log('Connected successfully to database' + settings.database)
    } catch(err){
        console.log('Connection failed !')
    }
}

module.exports = {
    sequelize,
    createSequelize
}