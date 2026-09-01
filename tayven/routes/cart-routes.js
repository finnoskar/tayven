import express from 'express';
import session from "express-session";

import { tayvenInfo, db, products} from '../app.js'

const cartRouter = express.Router();

cartRouter.get("/", (req, res) => {
    if (req.session.cart) {
        res.render("cart", { 
            products: req.session.cart,
            ...tayvenInfo
        });
    } else {
        return res.json({
            code: "CART_EMPTY",
            message: "Your cart is empty."
        })
    }
})
cartRouter.post("/order", (req, res) => {
    res.send("ordered");
})
cartRouter.post("/update", (req, res) => {
    res.send("updated");
})

export default cartRouter;
