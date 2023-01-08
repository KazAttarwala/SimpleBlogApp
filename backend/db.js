import { MongoClient } from "mongodb";

let db;

const connectToDb = async (serverUrl, dbName, cb) => {
    const client = new MongoClient(serverUrl);
    await client.connect()
    db = client.db(dbName);
    cb();
}

export {db, connectToDb}