import { Collection, Db, MongoClient } from "mongodb";

// setzte mongo url zum verbinden
const mongoUrl: string = "mongodb+srv://TestAsya2:12345@cluster0.q7enn.mongodb.net/Test?retryWrites=true&w=majority";


// setze db variable
let cachedDb: Db | null = null;

export async function connectDB(): Promise<Db> {
    if (cachedDb) {
        // wenn bereits eine verbindung besteht - return
        return cachedDb;
    }

    let db: Db;
    let client: MongoClient;

    // try connect mit mongo
    try {
        client = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.info(`Successfully connected to db`);
    } catch (error) {
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

// setzt collection zur nutzung und gibt sie zurück
export async function getCollection(collectionName: string): Promise<Collection> {
    const db: Db = await connectDB();
    const collection: Collection = db.collection(collectionName);

    return collection;
}