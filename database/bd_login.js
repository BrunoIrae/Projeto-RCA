const sequelize = require('sequelize')
const connection = new sequelize('cadastrouser', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection