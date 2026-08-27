import mongoose from "mongoose";
import "dotenv/config";

const DB_URI = process.env.DB_URI;

export async function connectDB() {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to Database")
    }
    catch (error) {
        console.error(error);
        console.log("Error connecting to Database");
        process.exit(1);
    }
}
export async function getData() {}

const Schema = mongoose.Schema;

const ProductSchema  = new Schema({
    productId: { type: Number, required: true, unique: true},
    name: { type: String, required: true, unique: true },
    price: {type: Number, required: true, min: 0},
    description: {type: String, required: true}
})

const QuoteSchema = new Schema({
    contact: {
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },
    details: {
        caught: {type: Boolean, required: true},
        height: { type: String, required: true },
        area: { type: Number, required: true },
        comments: { type: String, required: true }
    },
    meta: {
        createdAt: { type: Date, required: true}
    }
})

export const ProductModel = mongoose.model("Product", ProductSchema);

export const QuoteModel = mongoose.model("Quote", QuoteSchema);

