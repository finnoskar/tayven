import express from 'express';
import session from 'express-session';
import multer from 'multer';
import mongoose from 'mongoose';

import {ProductModel} from "../data.js";
import {tayvenInfo, products, db} from "../app.js";


const productRouter = express.Router();

productRouter.get("/", (req, res) => {
    res.render("products", {
        ...tayvenInfo,
        products: products
    });
})

productRouter.get("/:sku", async (req, res) => {
    try {
        let product = await ProductModel.findOne({ sku: req.params.sku });
        if (product) {
            res.render("product", {
                name: product.name,
                price: product.price,
                description: product.description,
                ...tayvenInfo
            })
        } else {
            res.render('error', {
                message: `Oops! We can't find that product (sku: ${req.params.sku}). <br>Please return to the products page and try again.`,
                ...tayvenInfo
            });
            console.log(`Could not find product ${product.name} in database.`);
        }
    }
    catch (error) {
        res.render('error', {
            message: `Error 500: Something went wrong on our side, please try again later.`,
            ...tayvenInfo
        });
        console.log(`Error searching database for product: ${req.params.sku}. Error: ${error}`)
    }
})

export default productRouter;