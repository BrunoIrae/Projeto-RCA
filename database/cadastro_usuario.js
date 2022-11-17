const sequelize = require('sequelize')
const connection = require('../database/bd_login')

const usuario = connection.define('usuarios', {
    email:{
        type:sequelize.STRING,
        allowNull: false
    },
    senha:{
        type:sequelize.STRING,
        allowNull: false
    },
    confirma_senha:{
        type:sequelize.STRING,
        allowNull: false
    }
})

//usuario.sync({force: false}).then(() => {});

module.exports = usuario