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
app.get("*", (req, res) => {
    res.render("404");
})
app.listen(PORT, ()=>{console.log("Server running on port: " + PORT)});

