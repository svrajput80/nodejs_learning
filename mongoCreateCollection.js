const { MongoClient } = require('mongodb');

// Replace with your MongoDB connection string
const url = 'mongodb://localhost:27017'; // Change to your MongoDB URI
const dbName = 'nodejs'; // Replace with your database name

async function createCollection(collectionName) {
  const client = new MongoClient(url);

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    // Access the database
    const db = client.db(dbName);

    // Create a new collection
    const collection = await db.createCollection(collectionName);
    console.log(`Collection created: ${collection.collectionName}`);
  } catch (error) {
    console.error('Error creating collection:', error);
  } finally {
    // Close the connection
    await client.close();
  }
}

// Replace 'myNewCollection' with your desired collection name
createCollection('test');
