require('dotenv').config()

const settings = {
    app_port: process.env.PORT,
    username: process.env.username,
    password: process.env.password,
    defaultDb: 'postgres',
    database: process.env.database,
    host: process.env.host,
    dialect: process.env.dialect
}

module.exports = settings