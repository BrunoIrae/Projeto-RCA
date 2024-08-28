const sequelize = require('sequelize')
const connection = new sequelize('formulario-rca', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection
