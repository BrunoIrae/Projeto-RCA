const sequelize = require('sequelize')
const connection = require('../database/bd_formulario')

const pet = connection.define('pets', {
    nome_pet: {
        type: sequelize.STRING,
        allowNull: false
    },
    sexo_pet: {
        type: sequelize.STRING,
        allowNull: false
    },
    data_resgate_pet: {
        type: sequelize.DATE,
        allowNull: false
    },
    cidade: {
        type: sequelize.STRING,
        allowNull: false
    },
    estado: {
        type: sequelize.STRING,
        allowNull: false
    },
    endereco: {
        type: sequelize.STRING,
        allowNull: false
    }
})

//pet.sync({force: false}).then(() => {});

module.exports = pet