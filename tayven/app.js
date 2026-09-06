import express from "express";
import ejs from "ejs";
import multer from "multer";
import mongoose from "mongoose";
import session from "express-session";
import 'dotenv/config';


import { connectDB, ProductModel, QuoteModel, Info } from "./data.js"
import cartRouter from "./routes/cart-routes.js";
import productRouter from "./routes/product-routes.js";

const app = express();
const PORT = process.env.PORT;
const DB_URI = process.env.DB_URI;

app.set("view engine", "ejs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'));
app.use(session({
    secret: process.env.SESSION_SECRET || "1234567890f385dbe378twlgrfy",
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

app.post("/add-to-cart/:sku", async (req, res) => {
    console.log("received request: add");
    console.log(req.params.sku);
    const product = await ProductModel.findOne({ sku: req.params.sku }).lean();
    if (!product) {
        console.log("Could not find product sku: " + req.params.sku);
        return res.status(400).send("Could not find product sku: " + req.params.sku) ;
    } else {
        req.session.cart = req.session.cart || [];
        let newItem = {
            sku: product.sku,
            name: product.name,
            price: product.price,
            quantity: 1
        }
        const duplicate = req.session.cart.find(item => item.sku === newItem.sku)
        if (duplicate) {
            duplicate.quantity += 1;
        } else {
            req.session.cart.push(newItem); // Add the product to the session cart
        }
        return res.send("Added");
    }
})

app.get("/mowing", (req, res) => {
    res.render("mowing", {
        ...tayvenInfo
    });
})

app.post("/quotes", (req, res) => {
    res.redirect("/");
    const { contact, options } = req.body;
})

app.use("/products", productRouter);

app.use("/cart", cartRouter);

app.get("/*error", (req, res) => {
    res.render("error", {
        message: `Oops! We can't find the page at "${req.path}". It might be mispelled or otherwise malformed. <br>Please return to the home page`,
        ...tayvenInfo
    });
})

app.listen(PORT, ()=>{console.log("Server running on port: " + PORT)});

