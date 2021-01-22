import { Collection, Db, InsertOneWriteOpResult, MongoClient } from "mongodb";

export interface LoginDetails {
    email: string;
    password: string;
}

export interface BaseUser extends LoginDetails {
    firstName: string;
    lastName: string;
    age: number | string;
}

export interface User extends BaseUser {
    _id: string;
}

// mongo url
const mongoUrl: string = "mongodb+srv://TestAsya:Program2020@cluster0.q7enn.mongodb.net/Test?retryWrites=true&w=majority";
const databaseName: string = "users";

async function connectDB(): Promise<Collection> {
    let db: Db;
    let client: MongoClient;

    // versucht sich mit mongo zu verbinden
    try {
        client = await MongoClient.connect(mongoUrl, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.info(`Successfully connected to db`);
    } catch (error) {
        console.error("Error connecting to database: ", error);

        // wirft einen fehler und kehrt zurück
        return process.exit(1);
    }

    // legt die zu verwendende datenbank fest 
    db = client.db(databaseName);

    // stellt die collection ein 
    const collection: Collection = db.collection("users");

    return collection;
}

export async function createUser(user: BaseUser): Promise<User> {
    // ruft die datenbank mit collection ab
    const collection: Collection = await connectDB();

    // überprüft ob der benutzer bereits in dieser collection vorhanden ist 
    const userExists: User | null = await collection.findOne({ email: user.email });

    if (userExists) {
        // wenn ein nutzer bereits existiert wird ein fehler ausgelöst welches mit dem script
        // interagiert um das einfügen eines doppelten wertes zu verhindern
        throw new Error("User with this email already exists");
    }

    // fügt neuen benutzer in die datenbank ein 
    const data: InsertOneWriteOpResult<User> = await collection.insertOne(user);

    // gibt die daten zurück
    return data.ops[0];
}

export async function getUsers(): Promise<User[]> {
    // datenbank mit collection abrufen
    const collection: Collection = await connectDB();

    // findet alle daten und wandelt die ergebnisse in ein array um und gibt sie zurück 
    return await collection.find().toArray();
}

export async function findUserByEmailAndPass(data: LoginDetails): Promise<User | null> {
    // holt sich die datenbank durch collection
    const collection: Collection = await connectDB();

    //findet eins (findone) und gibt das ergebnis zurück
    return await collection.findOne(data);
}