const sequelize = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("../database/database")

const Articles = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: sequelize.TEXT
        allowNull: false
    }   
})

module.exports = Articles;