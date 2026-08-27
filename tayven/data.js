import mongodb from "mongodb";
import "dotenv/config";

const DB_URI = process.env.DB_URI;
export let db;

const client = new mongodb.MongoClient(DB_URI);

export async function connect() {
    try {
        await client.connect();
        console.log("Connected to Database")
    }
    catch (error) {
        console.error(error);
        console.log("Error connecting to Database");
        process.exit(1);
    }
}
export async function getData() {
    try {
        const data = await db.collection("Data");
    }
    catch (error) {
        console.error(error);
        console.log("Error receiving Data Collection")
    }
}
