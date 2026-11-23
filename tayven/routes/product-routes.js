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
        if (!/[0-9]{3}/.test(req.params.sku)) {
            res.render('error', {
                message: `Oops! The sku address of this item (sku: ${req.params.sku}) does not match the correct format. <br>Please return to the products page and try again.`,
                errorcode: 400,
                ...tayvenInfo
            });
            console.log(`Malformed SKU: ${req.params.sku}`);
            return 0;
        }
        let product = await ProductModel.findOne({ sku: req.params.sku });
        if (product) {
            res.render("product", {
                sku: product.sku,
                name: product.name,
                price: product.price,
                description: product.description,
                ...tayvenInfo
            })
        } else {
            res.render('error', {
                message: `Oops! We can't find that product (sku: ${req.params.sku}). <br>Please return to the products page and try again.`,
                errorcode: 400,
                ...tayvenInfo
            });
            console.log(`Could not find product ${product.name} in database.`);
        }
    }
    catch (error) {
        res.render('error', {
            message: `Something went wrong on our side, please try again later.`,
            errorcode: 500,
            ...tayvenInfo
        });
        console.log(`Error searching database for product: ${req.params.sku}. Error: ${error}`)
    }
})

export default productRouter;