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
    }
})
cartRouter.post("/order", (req, res) => {
    res.send("ordered");
})
cartRouter.post("/update", (req, res) => {
    res.send("updated");
})

export default cartRouter;
