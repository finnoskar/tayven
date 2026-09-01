import express from 'express';
import session from "express-session";

import { tayvenInfo, db, products} from '../app.js';
import { ProductModel } from '../data.js';

const cartRouter = express.Router();

cartRouter.get("/", (req, res) => {
    if (req.session.cart) {
        res.render("cart", { 
            products: req.session.cart,
            quantities: req.session.cart.map(item => {1}),
            ...tayvenInfo
        });
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
        products: newProducts.
        quantities: quantities,
        ...tayvenInfo
    });
})

export default cartRouter;
