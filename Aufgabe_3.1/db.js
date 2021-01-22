"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmailAndPass = exports.getUsers = exports.createUser = void 0;
const mongodb_1 = require("mongodb");
// mongo url
const mongoUrl = "mongodb+srv://TestAsya2:12345@cluster0.q7enn.mongodb.net/Test?retryWrites=true&w=majority";
const databaseName = "users";
async function connectDB() {
    let db;
    let client;
    // versucht sich mit mongo zu verbinden
    try {
        client = await mongodb_1.MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.info(`Successfully connected to db`);
    }
    catch (error) {
        console.error("Error connecting to database: ", error);
        // wirft einen fehler und kehrt zurück
        return process.exit(1);
    }
    // legt die zu verwendende datenbank fest 
    db = client.db(databaseName);
    // stellt die collection ein 
    const collection = db.collection("users");
    return collection;
}
async function createUser(user) {
    // ruft die datenbank mit collection ab
    const collection = await connectDB();
    // überprüft ob der benutzer bereits in dieser collection vorhanden ist 
    const userExists = await collection.findOne({ email: user.email });
    if (userExists) {
        // wenn ein nutzer bereits existiert wird ein fehler ausgelöst welches mit dem script
        // interagiert um das einfügen eines doppelten wertes zu verhindern
        throw new Error("User with this email already exists");
    }
    // fügt neuen benutzer in die datenbank ein 
    const data = await collection.insertOne(user);
    // gibt die daten zurück
    return data.ops[0];
}
exports.createUser = createUser;
async function getUsers() {
    // datenbank mit collection abrufen
    const collection = await connectDB();
    // findet alle daten und wandelt die ergebnisse in ein array um und gibt sie zurück 
    return await collection.find().toArray();
}
exports.getUsers = getUsers;
async function findUserByEmailAndPass(data) {
    // holt sich die datenbank durch collection
    const collection = await connectDB();
    //findet eins (findone) und gibt das ergebnis zurück
    return await collection.findOne(data);
}
exports.findUserByEmailAndPass = findUserByEmailAndPass;
//# sourceMappingURL=db.js.map