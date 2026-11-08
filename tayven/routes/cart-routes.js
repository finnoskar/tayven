import express from 'express';
import session from "express-session";
import 'dotenv/config';

import { tayvenInfo, db, products} from '../app.js';
import { ProductModel, OrderModel } from '../data.js';

const cartRouter = express.Router();

cartRouter.get("/", async (req, res) => {
    if (req.session.cart) {
        const cart = {...req.session.cart};

        const newcart = {};

        newcart.contact = cart.contact;

        newcart.items = [];

        for (const item of req.session.cart.items) {
            const product = await ProductModel.findOne({ sku: item.sku});
            newcart.items.push({
                sku: item.sku,
                name: product.name,
                price: product.price,
                quantity: item.quantity
            })
        }

        res.render("cart", { 
            cart: newcart,
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
    res.render("order-complete", {...tayvenInfo});

    console.log("Map created, cart wiped.");
    console.log(typeof req.body.items);
    for (const [ sku, quantity ] of Object.entries(req.body.items)) {
        console.log("Iterating over products");
        if (!/^[0-9]{3}$/.test(sku)) {
            console.log("Invalid SKU: " + sku);
            continue
        }
        const product = await ProductModel.findOne({ sku: sku});
        console.log("Found product.");
        if (!product) {
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

    let orderItems = [];
    for (const [sku, qty] of Object.entries(items)) {
        const p = await ProductModel.findOne({ sku });
        const quantity = Number(qty);
        if (p && (quantity > 0)) {
            orderItems.push({sku, quantity});
        }
    }
    req.session.cart = {
        contact: contact,
        items: orderItems
    };
    res.redirect("../cart");
})

export default cartRouter;
