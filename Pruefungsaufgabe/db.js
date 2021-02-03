"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
// set mongo url to connect
const mongoUrl = "mongodb+srv://TestAsya2:12345@cluster0.q7enn.mongodb.net/Test?retryWrites=true&w=majority";
// set db variable
let cachedDb = null;
async function connectDB() {
    if (cachedDb) {
        // if connection already exists - return
        return cachedDb;
    }
    let db;
    let client;
    // try to connect to mongo
    try {
        client = await mongodb_1.MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.info(`Successfully connected to db`);
    }
    catch (error) {
        console.error("Error connecting to database: ", error);
        // throw error and return
        return process.exit(1);
    }
    // set database to use
    db = client.db("twitter");
    // set global db instance
    cachedDb = db;
    return db;
}
exports.connectDB = connectDB;
// set coolection to use and return it
async function getCollection(collectionName) {
    const db = await connectDB();
    const collection = db.collection(collectionName);
    return collection;
}
exports.getCollection = getCollection;
//# sourceMappingURL=db.js.map