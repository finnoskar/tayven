import express from 'express';
import session from "express-session";
import 'dotenv/config';

import { tayvenInfo, db, products} from '../app.js';
import { ProductModel } from '../data.js';

const cartRouter = express.Router();
cartRouter.use(session({
    secret: process.env.SESSION_SECRET || "1234567890f385dbe378twlgrfy",
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60, // after development, set it to 1000 * 60 * 60 * 2
        secure: false,
    }
}));

cartRouter.get("/", (req, res) => {
    console.log("cart page");
    console.log(req.session.cart);
    console.log("after cart");
    if (req.session.cart) {
        console.log("About to render");
        console.log(req.session.cart);
        res.render("cart", { 
            cart: req.session.cart,
            ...tayvenInfo
        });
    }
    else {
        console.log("no cart page");
        res.render("cart", {
            cart: false,
            ...tayvenInfo
        })

    }
})
cartRouter.post("/order", (req, res) => {
    const order = [];
    for (const [sku, {name, quantity}] of Object.entries(req.body.items)) {
        console.log(`Ordered ${quantity} of product "${name}", (sku ${sku})`);
    }
    // use email api to send tayven an email about the thing, possibly use an orders database
    
})
cartRouter.post("/update", (req, res) => {
    const { items, contact, action } = req.body;
    let newProducts = [];
    let quantities = [];
    for (const sku in items) {
        const p = ProductModel.findOne({ sku: sku });
        if (p) {
            newProducts.push(p);
            quantities.push(Number(items[sku].quantity));
        }
    }
    req.session.cart = newProducts;
    res.render("cart", {
        cart: newProducts,
        ...tayvenInfo
    });
})

export default cartRouter;
