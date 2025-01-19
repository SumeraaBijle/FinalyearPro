const { MongoClient } = require("mongodb");

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your Mongo URI to .env.local");
}

const uri = process.env.MONGODB_URI;
const options = {
  ssl: true,
  tlsAllowInvalidCertificates: true, // Disables SSL certificate validation, ensure it's needed
  retryWrites: true,
};

// Declare client and clientPromise
let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // In development mode, use a global variable to hold the connection promise to avoid re-connecting on every request
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri, options);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // In production, create a new connection each time
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

module.exports = clientPromise;
