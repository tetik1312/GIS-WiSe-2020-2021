"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPosts = exports.createPost = void 0;
const db_1 = require("./db");
const User_1 = require("./User");
// collection name zum abfragen der datenbank
const collectionName = "posts";
// create post mit bereitgestellten daten mit user erstellen
async function createPost(userId, data) {
    // zuerst müssen wir den user anhand seiner id finden um ihn zu identifizieren und den user.id an den vom neu erstellten post anzuhängen
    const user = await User_1.findUserById(userId);
    // wenn user gültig ist erstelle einen post
    if (user) {
        // create object das in die db eingefügt werden soll
        const post = {
            title: data.title,
            content: data.content,
            userId: user._id,
            createdAt: new Date()
        };
        // connecte db und rufe collection ab
        const collection = await db_1.getCollection(collectionName);
        // zum schluss wird der post in die db eingefügt
        const newPost = await collection.insertOne(post);
        // transformiert das ergebnis zu Post interface, fügt alle returned felder von newPost post object (CreatedPost interface) hinzu und hängt user object an
        return { ...newPost.ops[0], user };
    }
    // return null wenn user nicht anhand der id gefunden wurde
    return null;
}
exports.createPost = createPost;
// holt alle posts oder nur posts von usern denen er folgt
async function getPosts(userId) {
    // connecte db mit collection
    const collection = await db_1.getCollection(collectionName);
    // query (abfrage) variable wird definiert, hier hat man die user ids wenn der user eingeloggt ist
    let query = {};
    // wenn user eingelogged ist - erhalte seine posts und posts von usern denen er folgt
    if (userId) {
        const user = await User_1.findUserById(userId);
        // überprüfe ob ein user gefunden wurde und fahre in dem fall fort
        if (user) {
            const ids = [];
            // pusht eingeloggte user id
            ids.push(user._id);
            // wenn user jemandem folgt, verfügt er über arrays von ids, hier werden diese hinzugefügt
            if (user.users) {
                // pusht ids von usern denen gefolgt wird
                ids.push(...user.users);
            }
            // setzt schließlich querys mit allen gefundenen ids, andererseits wird das object leer sein
            query = { userId: { $in: ids } };
        }
    }
    // query db mit einer aggregate method
    const posts = await collection
        .aggregate([
        // legt bedingung fest nach denen posts anhand der user id gesucht werden soll,
        // wenn user nicht eingelogged ist, ist query (abfrage) ein leeres object und es werden posts von allen usern angezeigt
        { $match: query },
        // sucht nach verknüpften usern
        // wir verbinden user tabelle, indem die userId für die auf posts collection (localField) angepasst wird 
        // und users.id auf der user tabelle (foreignField)
        // und neue columns die users erhalten, dies gibt einen array zurück
        {
            $lookup: {
                from: "users",
                localField: "userId",
                foreignField: "_id",
                as: "users"
            }
        },
        // legt felder fest die zurückgegeben werden sollen
        {
            $project: {
                // hier werden die user arrays das wir oben erhalten haben in ein einzelnes user object transformiert,
                // da der post nur einen user haben kann (eigentümer des posts)
                user: { $arrayElemAt: ["$users", 0] },
                // stellt den rest der felder ein
                _id: "$id",
                title: "$title",
                content: "$content",
                createdAt: "$createdAt"
            }
        },
        // sortiert es nach datum, und neueste posts kommen zuerst
        {
            $sort: { createdAt: -1 }
        }
    ])
        // ergebnis wird in ein array konvertiert
        .toArray();
    return posts;
}
exports.getPosts = getPosts;
//# sourceMappingURL=post.js.map