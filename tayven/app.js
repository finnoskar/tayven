import express from "express";
import ejs from "ejs";
import multer from "multer";


const app = express();
const PORT = 3000;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.static('public'));


app.get("/", (req, res) => {
    res.render("index");
    console.log('Home page loaded: /index')
})
app.get("/product/:name", (req, res) => {
    res.render("product", {
        name: req.params.name,
        price: "$40",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ducimus in officiis unde."
    });
})
app.get("/products", (req, res) => {
    res.render("products");
})
app.get("*", (req, res) => {
    res.render("404", { path: req.path});
})
app.listen(PORT, ()=>{console.log("Server running on port: " + PORT)});

