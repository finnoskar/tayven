import express from 'express';
import session from "express-session";
import 'dotenv/config';

import { tayvenInfo, db, products} from '../app.js';
import { ProductModel, OrderModel } from '../data.js';

const cartRouter = express.Router();

cartRouter.get("/", (req, res) => {
    if (req.session.cart) {
        res.render("cart", { 
            cart: req.session.cart,
            ...tayvenInfo
        });
    }
    else {
        res.render("cart", {
            cart: false,
            ...tayvenInfo
        })
    }
})

cartRouter.post("/order", async (req, res) => {
    const items = new Map();
    req.session.cart = null;
    res.render("order-complete", {...tayvenInfo})

    for (const [sku, {name, quantity}] of Object.entries(req.body.items)) {
        const product = await ProductModel.findOne({ sku: sku});
        if (!/^[0-9]{3}/.test(sku) || !product) {
            console.log("Invalid SKU: " + sku);
            continue
        }
        items.set(sku, quantity);
    }
    const order = new OrderModel({
        contact: req.body.contact,
        items: items
    });
    await order.save();
    // use email api to send tayven an email about the thing, possibly use an orders database
})

cartRouter.post("/update", async (req, res) => {
    const { items, contact, action } = req.body;
    let newProducts = [];
    // for (const sku in items) {
    //     const p = await ProductModel.findOne({ sku: sku });
    //     const quantity = Number(items[sku].quantity);
    //     if (p && quantity !== 0) {
    //         newProducts.push({
    //             sku: p.sku,
    //             name: p.name,
    //             price: p.price,
    //             quantity: Number(items[sku].quantity)
    //         });
    //     }
    // }
    let orderMap = new Map();
    for (const sku in items) {
        const p = await ProductModel.findOne({ sku: sku });
        const quantity = Number(items[sku].quantity);
        if (p && (quantity !== 0)) {
            orderMap.set(sku, quantity);
        }
    }
    const order = new OrderModel({
        contact: req.body.contact,
        items: orderMap
    });
    req.session.cart = newProducts;
    res.render("cart", {
        cart: newProducts,
        ...tayvenInfo
    });
})

export default cartRouter;
