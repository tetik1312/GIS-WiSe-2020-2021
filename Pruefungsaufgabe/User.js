"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.unfollow = exports.follow = exports.getUsers = exports.findUserByEmailAndPass = exports.findUserById = exports.updateProfile = exports.createUser = void 0;
const mongodb_1 = require("mongodb");
const db_1 = require("./db");
// define collection name to use in database
const collectionName = "users";
// register new user with provided data
async function createUser(data) {
    // connect to db and get collection
    const collection = await db_1.getCollection(collectionName);
    // create user object to insert in database
    const user = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        age: data.age,
        users: []
    };
    //set email as unique field first
    await collection.createIndex({ email: 1 }, {
        unique: true
    });
    // insert to database
    await collection.insertOne(user);
}
exports.createUser = createUser;
// update profile with provided user id and data
async function updateProfile(userId, data) {
    // set fields to Update
    const update = {
        $set: {
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: data.password,
            age: data.age
        }
    };
    // call funct to update the user
    return await updateOne(update, userId);
}
exports.updateProfile = updateProfile;
async function findUserById(id) {
    const collection = await db_1.getCollection(collectionName);
    // transform id string to ObjectId for mongo and find user by the id
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
    // find all users and trasform result to array
    return await collection.find().toArray();
}
exports.getUsers = getUsers;
async function follow(userId, followId) {
    // add to set will add new element to the array if it foesnt exists yet,
    // transform id strong to Object if for mongo
    const update = {
        $addToSet: { users: new mongodb_1.ObjectId(followId) }
    };
    return await updateOne(update, userId);
}
exports.follow = follow;
async function unfollow(userId, followId) {
    // pull removes requested id from array if it exists
    const update = {
        $pull: { users: new mongodb_1.ObjectId(followId) }
    };
    return await updateOne(update, userId);
}
exports.unfollow = unfollow;
// [key: string] means we can have any work for the key in our object
async function updateOne(update, userId) {
    const collection = await db_1.getCollection(collectionName);
    // condition  to find user, convert is string to objectId for mongo
    const query = { _id: new mongodb_1.ObjectId(userId) };
    // options what to recieve
    const options = { returnOriginal: false, upsert: false, projection: {} };
    // update user
    const result = await collection.findOneAndUpdate(query, update, options);
    // return update user document
    return result.value;
}
//# sourceMappingURL=User.js.map