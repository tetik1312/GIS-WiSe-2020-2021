"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCollection = exports.connectDB = void 0;
const mongodb_1 = require("mongodb");
// setzte mongo url zum verbinden
const mongoUrl = "mongodb+srv://TestAsya2:12345@cluster0.q7enn.mongodb.net/Test?retryWrites=true&w=majority";
// setze db variable
let cachedDb = null;
async function connectDB() {
    if (cachedDb) {
        // wenn bereits eine verbindung besteht - return
        return cachedDb;
    }
    let db;
    let client;
    // try connect mit mongo
    try {
        client = await mongodb_1.MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.info(`Successfully connected to db`);
    }
    catch (error) {
        console.error("Error connecting to database: ", error);
        // throw error und return
        return process.exit(1);
    }
    // setze datenbank zur nutzung
    db = client.db("twitter");
    // festlegen der global db instanz
    cachedDb = db;
    return db;
}
exports.connectDB = connectDB;
// setzt collection zur nutzung und gibt sie zurück
async function getCollection(collectionName) {
    const db = await connectDB();
    const collection = db.collection(collectionName);
    return collection;
}
exports.getCollection = getCollection;
//# sourceMappingURL=db.js.map