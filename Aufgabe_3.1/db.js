"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmailAndPass = exports.getUsers = exports.createUser = void 0;
const mongodb_1 = require("mongodb");
// mongo url
const mongoUrl = "mongodb+srv://TestAsya:<password>@cluster0.q7enn.mongodb.net/<dbname>?retryWrites=true&w=majority";
const databaseName = "users";
async function connectDB() {
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
    db = client.db(databaseName);
    // set collection
    const collection = db.collection("users");
    return collection;
}
async function createUser(user) {
    // get db with collection
    const collection = await connectDB();
    // check if user already exists in this collection
    const userExists = await collection.findOne({ email: user.email });
    if (userExists) {
        // throw Error if so to interact the script and prevent inserting duplicate value
        throw new Error("User with this email already exists");
    }
    // insert new user to database
    const data = await collection.insertOne(user);
    // return data
    return data.ops[0];
}
exports.createUser = createUser;
async function getUsers() {
    // get db with collection
    const collection = await connectDB();
    // find all, transform result to array and return
    return await collection.find().toArray();
}
exports.getUsers = getUsers;
async function findUserByEmailAndPass(data) {
    // get db with collection
    const collection = await connectDB();
    //find one and return result
    return await collection.findOne(data);
}
exports.findUserByEmailAndPass = findUserByEmailAndPass;
//# sourceMappingURL=db.js.map