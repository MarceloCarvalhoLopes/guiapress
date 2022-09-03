const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const connection = require("./database/database");

//controller
const categoriesController = require("./categories/CategoriesController");
const articlesController = require("./articles/ArticlesController");

//model
const Article = require("./articles/Article");
const Category = require("./categories/Category");


// view engine
app.set('view engine','ejs');

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

//view de artigos
app.get("/", (req,res)=>{
    Article.findAll({
        order:[
            ['id', 'DESC']
        ]
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
                res.render("index", {article : article, categories: categories});
            });
        }else{
            res.redirect("/")
        }
    }).catch(err =>{
        res.redirect("/")
    })
});

app.listen(8080, ()=> {
    console.log("Server is running!");
})