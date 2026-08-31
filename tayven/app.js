import express from "express";
import ejs from "ejs";
import multer from "multer";
import mongoose from "mongoose";
import session from "express-session";
import 'dotenv/config';

import { connectDB, ProductModel, QuoteModel, Info } from "./data.js"
import cartRouter from "./routes/cart-routes.js";
import productRouter from "./routes/product-routes.js";
import ProductRoutes from "./routes/product-routes.js";

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60, // after development, set it to 1000 * 60 * 60 * 2
        secure: false,
    }
}));

export const db = connectDB();

export const products = await ProductModel.find();

export const quotes = await QuoteModel.find();

export const [{_id, ...tayvenInfo}] = await Info.find().lean();

app.get("/", (req, res) => {
    res.render("index", {
        ...tayvenInfo
    });
    console.log('Home page loaded: /index')
})

app.post("/add-to-cart/:sku", (req, res) => {
    const product = ProductModel.findOne({ sku: req.params.sku });
    if (!product) {
        console.log("Could not find product sku: " + req.params.sku);
        return res.status(400).send({})
    }
    else {
        req.session.cart = product; // must make this add to cart as an array of Documents
    }
})

app.get("/mowing", (req, res) => {
    res.render("mowing", {
        ...tayvenInfo
    });
})

app.use("/products", productRouter);

app.use("/cart", cartRouter);

app.get("*", (req, res) => {
    res.render("error", {
        message: `Oops! We can't find the page at "${req.path}". It might be mispelled or otherwise malformed. <br>Please return to the home page`,
        ...tayvenInfo
    });
})

app.listen(PORT, ()=>{console.log("Server running on port: " + PORT)});

