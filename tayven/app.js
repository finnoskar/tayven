import express from "express";
import ejs from "ejs";
import multer from "multer";
import mongoose from "mongoose";
import 'dotenv/config';
import {connectDB, getData, ProductModel, QuoteModel} from "./data.js"

import { cartRouter } from "./routes/routes.js";


const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));

connectDB();

app.get("/", (req, res) => {
    res.render("index", {
        tayvenEmail: "tayven@example.com",
        tayvenPhone: "022 something"
    });
    console.log('Home page loaded: /index')
})
app.get("/product/:name", (req, res) => {
    const productName = req.params.name;
    res.render("product", {
        name: req.params.name,
        price: "$40",
        description: "A green product made with lots of green stuff and i also chucked toxic chemicals in it to give you spiderman powers like Tom Holland.",
        tayvenEmail: "tayven@example.com",
        tayvenPhone: "022 something"
    });
})
app.get("/products", (req, res) => {
    res.render("products", {
        tayvenEmail: "tayven@example.com",
        tayvenPhone: "022 something"
    });
})
app.get("/mowing", (req, res) => {
    res.render("mowing", {
        tayvenEmail: "tayven@example.com",
        tayvenPhone: "022 something"
    });
})

app.use("/cart", cartRouter);

app.get("*", (req, res) => {
    res.render("404", {
        path: req.path,
        tayvenEmail: "tayven@example.com",
        tayvenPhone: "022 something"
    });
})
app.listen(PORT, ()=>{console.log("Server running on port: " + PORT)});

