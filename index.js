const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const connection = require("./database/database");

//controller
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");
const usersController = require("./users/UsersController");

//model
const Article = require("./articles/Article");
const Category = require("./categories/Category");
const User = require("./users/User");



// view engine
app.set('view engine','ejs');

//session

app.use(session({
    secret: "qualquercoisa", cookie: {maxAge : 30000}
}))

//static
app.use(express.static('public'));

//body parser
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


//database
connection
    .authenticate()
    .then(() => {
        console.log("Successful connection!");
    }).catch((error) =>{
        console.log(error);
    })

app.use("/",categoriesController) ;
app.use("/",articlesController) ;
app.use("/",usersController);

//view de artigos
app.get("/", (req,res)=>{
    Article.findAll({
        order:[
            ['id', 'DESC']
        ],
        limit: 4
    }).then(articles =>{
        Category.findAll().then(categories => {
            res.render("index", {articles : articles, categories: categories});
        });              
    });  
});

//view de artigos slug
app.get("/:slug",(req, res) =>{
    var slug = req.params.slug;
    Article.findOne({
        where:{
            slug:slug
        }
    }).then(article => {
        if(article != undefined){
            Category.findAll().then(categories => {
                res.render("article", {article : article, categories: categories});
            });
        }else{
            res.redirect("/")
        }
    }).catch(err =>{
        res.redirect("/")
    })
});

//Filtrando artigos por categoria
app.get("/category/:slug",(req, res) =>{
    var slug = req.params.slug;
    Category.findOne({
        where: {
            slug : slug
        },
        include: [{model: Article}]
    }).then(category => {
        if (category != undefined){

            Category.findAll().then(categories => {
                res.render("index", {articles: category.articles, categories: categories})
            });

        }else{
            res.redirect("/");
        }
    }).catch( err => {
        res.redirect("/");
    })
})


app.listen(8080, ()=> {
    console.log("Server is running!");
})