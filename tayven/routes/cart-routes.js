import express from 'express';
import session from "express-session";

import { tayvenInfo } from '../app.js'

const cartRouter = express.Router();

cartRouter.get("/", (req, res) => {
    res.render("cart", { // Later add rest of form data
        ...tayvenInfo
    });
})
cartRouter.post("/order", (req, res) => {
    res.send("ordered");
})
cartRouter.post("/update", (req, res) => {
    res.send("updated");
})

export default cartRouter;