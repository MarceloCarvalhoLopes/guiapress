const sequelize = require("sequelize");
const Sequelize = require("sequelize");
const connection = require("../database/database")
const Category = require("../categories/Category")


const Article = connection.define('articles', {
    title:{
        type: Sequelize.STRING,
        allowNull: false
    },
    slug:{
        type: Sequelize.STRING,
        allowNull: false
    },
    body:{
        type: sequelize.TEXT,
        allowNull: false
    }   
})

Category.hasMany(Article); //A Category has many articles
Article.belongsTo(Category); //A Article belongs to a category

//Article.sync({force : true});

module.exports = Article;