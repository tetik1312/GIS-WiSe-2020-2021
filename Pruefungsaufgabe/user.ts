import { Collection, FilterQuery, FindAndModifyWriteOpResultObject, FindOneAndUpdateOption, ObjectId } from "mongodb";
import { getCollection } from "./db";


interface BaseUser {
    firstName: string;
    lastName: string;
    email: string;
    age: number | string;
    password: string;
}

// diesen interface erweitern wir von der BaseUser und verwenden es um den benutzer zu erstellen. wir haben noch kein _id feld 
// user ist ein array von users ids die der richtige user abonniert hat
export interface UserDto extends BaseUser {
    users: string[];
}

// das verwenden wir nachdem wir den user aus der db abgefragt haben. das ist was zum front zurückkehrt
export interface User extends UserDto {
    _id: string;
}

// definiert den collectionname der in der db verwendet werden soll
const collectionName: string = "users";

// registriert einen neuen user mit den bereitgestellten daten
export async function createUser(data: BaseUser): Promise<void> {
    // connected sich zur db und erhält die collection
    const collection: Collection = await getCollection(collectionName);

    // create user object das in die db eingefügt werden soll
    const user: UserDto = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        age: data.age,
        users: []
    };

    // legt zuerst die email als eindeutiges feld fest
    await collection.createIndex(
        { email: 1 },
        {
            unique: true
        }
    );

    // fügt in die db ein 
    await collection.insertOne(user);
}

// profile mit angegebener user id und daten aktualisieren
export async function updateProfile(userId: string, data: BaseUser): Promise<User | null> {
    // setzt felder auf aktualisieren
    const update: { $set: BaseUser } = {
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

export async function findUserById(id: string): Promise<User | null> {
    const collection: Collection = await getCollection(collectionName);

    // transformiert id string für mongo zu ObjectId und sucht user anhand der id
    return await collection.findOne({ _id: new ObjectId(id) });
}

export async function findUserByEmailAndPass(email: string, password: string): Promise<User | null> {
    const collection: Collection = await getCollection(collectionName);

    return await collection.findOne({ email, password });
}

export async function getUsers(): Promise<User[]> {
    const collection: Collection = await getCollection(collectionName);

    // findet alle user und trasformiert das ergebnis in ein array um
    return await collection.find().toArray();
}

export async function follow(userId: string, followId: string): Promise<User | null> {
    // add to set fügt dem array ein neues element hinzu falls es noch nicht existiert,
    // transformiert die id strong zu Object für mongo
    const update: { $addToSet: { users: ObjectId } } = {
        $addToSet: { users: new ObjectId(followId) }
    };

    return await updateOne(update, userId);
}

export async function unfollow(userId: string, followId: string): Promise<User | null> {
    // durch pull wird die angeforderte id aus dem array entfernt, falls es existiert
    const update: { $pull: { users: ObjectId } } = {
        $pull: { users: new ObjectId(followId) }
    };

    return await updateOne(update, userId);
}

// [key: string] bedeutet das wir jede arbeit für den key in unserem object haben können
async function updateOne(update: { [key: string]: {} }, userId: string): Promise<User> {
    const collection: Collection = await getCollection(collectionName);

    // bedingung um user zu finden, konvertiere string zu objectId für mongo
    const query: FilterQuery<ObjectId> = { _id: new ObjectId(userId) };

    // optionen was zu erhalten ist
    const options: FindOneAndUpdateOption<boolean> = { returnOriginal: false, upsert: false, projection: {} };

    // update den user
    const result: FindAndModifyWriteOpResultObject<User> = await collection.findOneAndUpdate(query, update, options);

    // return update des user documents
    return result.value;
}