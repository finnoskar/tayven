import mongoose from "mongoose";
import "dotenv/config";

const DB_URI = process.env.DB_URI;

export async function connectDB() {
    try {
        console.log("Attempting to connect to DB");
        await mongoose.connect(DB_URI);
        console.log("Connected to Database")
    }
    catch (error) {
        console.error(error);
        console.log("Error connecting to Database");
        process.exit(1);
    }
}

const Schema = mongoose.Schema;

const ProductSchema  = new Schema({
    sku: { type: String, required: true, unique: true, match: [/^[0-9]{3}$/, "Sku must be 3 digit numeric sequence like '023'"]},
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
        caught: {type: String, required: true},
        height: { type: String, required: true },
        area: { type: String, required: true },
        comments: { type: String, required: false, default: "" }
    }
}, { timestamps: true })

const InfoSchema = new Schema({
    tayvenEmail: { type: String, required: true },
    tayvenPhone: { type: String, required: true }
})

const OrderSchema = new Schema({
    contact: {
        fname: { type: String, required: true },
        lname: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: false },
        address: { type: String, required: true },
    },
    items: {
        type: Map,
        of: Number,
        required: true
    }
}, { timestamps: true })

export const ProductModel = mongoose.model("Product", ProductSchema);

export const QuoteModel = mongoose.model("Quote", QuoteSchema);

export const Info = mongoose.model("Info", InfoSchema, "tayveninfo");

export const OrderModel = mongoose.model("Order", OrderSchema);