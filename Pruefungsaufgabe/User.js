"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollow = exports.follow = exports.getUsers = exports.findUserByEmailAndPass = exports.findUserById = exports.updateProfile = exports.createUser = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("./db");
// definiert den collectionname der in der db verwendet werden soll
const collectionName = "users";
// registriert einen neuen user mit den bereitgestellten daten
async function createUser(data) {
    // connected sich zur db und erhält die collection
    const collection = await db_1.getCollection(collectionName);
    // create user object das in die db eingefügt werden soll
    const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        age: data.age,
        users: []
    };
    // legt zuerst die email als eindeutiges feld fest
    await collection.createIndex({ email: 1 }, {
        unique: true
    });
    // fügt in die db ein 
    await collection.insertOne(user);
}
exports.createUser = createUser;
// profile mit angegebener user id und daten aktualisieren
async function updateProfile(userId, data) {
    // setzt felder auf aktualisieren
    const update = {
        $set: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            age: data.age
        }
    };
    // ruft function auf um den user zu aktualisieren
    return await updateOne(update, userId);
}
exports.updateProfile = updateProfile;
async function findUserById(id) {
    const collection = await db_1.getCollection(collectionName);
    // transformiert id string für mongo zu ObjectId und sucht user anhand der id
    return await collection.findOne({ _id: new mongodb_1.ObjectId(id) });
}
exports.findUserById = findUserById;
async function findUserByEmailAndPass(email, password) {
    const collection = await db_1.getCollection(collectionName);
    return await collection.findOne({ email, password });
}
exports.findUserByEmailAndPass = findUserByEmailAndPass;
async function getUsers() {
    const collection = await db_1.getCollection(collectionName);
    // findet alle user und trasformiert das ergebnis in ein array um
    return await collection.find().toArray();
}
exports.getUsers = getUsers;
async function follow(userId, followId) {
    // add to set fügt dem array ein neues element hinzu falls es noch nicht existiert,
    // transformiert die id strong zu Object für mongo
    const update = {
        $addToSet: { users: new mongodb_1.ObjectId(followId) }
    };
    return await updateOne(update, userId);
}
exports.follow = follow;
async function unfollow(userId, followId) {
    // durch pull wird die angeforderte id aus dem array entfernt, falls es existiert
    const update = {
        $pull: { users: new mongodb_1.ObjectId(followId) }
    };
    return await updateOne(update, userId);
}
exports.unfollow = unfollow;
// [key: string] bedeutet das wir jede arbeit für den key in unserem object haben können
async function updateOne(update, userId) {
    const collection = await db_1.getCollection(collectionName);
    // bedingung um user zu finden, konvertiere string zu objectId für mongo
    const query = { _id: new mongodb_1.ObjectId(userId) };
    // optionen was zu erhalten ist
    const options = { returnOriginal: false, upsert: false, projection: {} };
    // update den user
    const result = await collection.findOneAndUpdate(query, update, options);
    // return update des user documents
    return result.value;
}
//# sourceMappingURL=user.js.map