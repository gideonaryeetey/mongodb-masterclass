const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();

const { MONGODB_URI: url, DB_NAME: dbName } = process.env;

let db;

async function connectDB() {
  const client = new MongoClient(url, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    if (db) return db;
    await client.connect();
    console.log("Connected successfully to MongoDB");
    db = client.db(dbName);
    return db;
  } catch (err) {
    console.error(err);
  }
}

module.exports = connectDB;