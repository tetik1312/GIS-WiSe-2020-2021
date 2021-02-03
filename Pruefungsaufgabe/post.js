"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.createPost = void 0;
const db_1 = require("./db");
const User_1 = require("./User");
// collection name to query the database
const collectionName = "posts";
// create post with provided data with user
async function createPost(userId, data) {
    // first, we need to find user by id to identify him and attach user.id to new created post
    const user = await User_1.findUserById(userId);
    // if user is valid create a post
    if (user) {
        // create object to insert to database
        const post = {
            title: data.title,
            content: data.content,
            userId: user._id,
            createdAt: new Date()
        };
        // connect database and get collection
        const collection = await db_1.getCollection(collectionName);
        // finally insert the post to database
        const newPost = await collection.insertOne(post);
        // transform result to Post interface, add all returned fields of newPost post object (CreatedPost interface) and attach user object
        return { ...newPost.ops[0], user };
    }
    // return null if user was not found by id
    return null;
}
exports.createPost = createPost;
// get all posts or only posts of users one is following
async function getPosts(userId) {
    // connect db with collection
    const collection = await db_1.getCollection(collectionName);
    // define query variable, we will have user's ids here if user  is logged in
    let query = {};
    // if user is logged in - get his posts and posts of users hes following
    if (userId) {
        const user = await User_1.findUserById(userId);
        // check if user is found and continue if so
        if (user) {
            const ids = [];
            // push logged in user id
            ids.push(user._id);
            // if user is following anyone, he will have an array of ids, add them
            if (user.users) {
                // push ids of users thats being followed
                ids.push(...user.users);
            }
            // finally set query with all ids founds, userwise it will be empty object
            query = { userId: { $in: ids } };
        }
    }
    // query database with aggregate method
    const posts = await collection
        .aggregate([
        // set conditions which posts to find by user id,
        // if user is not logged in query will be an empty object and we will see posts of all users
        { $match: query },
        // Lookup linked users
        // we join users table, by matching userId on posts collection (localField)
        // and users.id on users table (foreignField)
        // and get new columns users (as), this will return us array
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "users"
            }
        },
        // set fields that sould be returned
        {
            $project: {
                // here we transform our users array we got above into a signle user object,
                // since post can have just one user (owner of the post)
                user: { $arrayElemAt: ["$users", 0] },
                // set rest of the fields
                _id: "$id",
                title: "$title",
                content: "$content",
                createdAt: "$createdAt"
            }
        },
        //sort by dat, newly posts first
        {
            $sort: { createdAt: -1 }
        }
    ])
        // convert result to an array
        .toArray();
    return posts;
}
exports.getPosts = getPosts;
//# sourceMappingURL=post.js.map