const express = require('express');
var http = require('http');
const { MongoClient, ObjectId } = require('mongodb');
// var MongoClient = require('mongodb').MongoClient;
// var url = "mongodb://localhost:27017/";



const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(express.json());

// MongoDB connection URL and database name
const url = 'mongodb://localhost:27017';
const dbName = 'nodejs';

// MongoDB client
const client = new MongoClient(url);

// Connect to MongoDB
async function connectDB() {
  await client.connect();
  console.log('Connected successfully to MongoDB');
  return client.db(dbName);
}

// Create
app.post('/users', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('users');
    const result = await collection.insertOne(req.body);
    console.log(req.body);
    res.status(201).json(result);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create item' });
  }
});

// Read All
app.get('/users', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('users');
    const items = await collection.find({}).toArray();
    res.status(200).json(items);
  } catch (error) {
    res.status(500).json({ error: 'Failed to retrieve items' });
  }
});

// Read One by name
  app.get('/users/:phone', async (req, res) => {
    console.log(req.params.phone);
    try {
      const db = await connectDB();
      const collection = db.collection('users');
      const item = await collection.findOne({ phone: parseInt(req.params.phone) });
      if (item) {
        res.status(200).json(item);
      } else {
        res.status(404).json({ error: 'Item not found' });
      }
    } catch (error) {
      res.status(500).json({ error: 'Failed to retrieve item' });
    }
  });

// Update
app.put('/users/:phone', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('users');
    const result = await collection.updateOne(
      { phone: parseInt(req.params.phone) },
      { $set: req.body }
    );
    if (result.modifiedCount > 0) {
      res.status(200).json({ message: 'Item updated successfully' });
    } else {
      res.status(404).json({ error: 'Item not found or nothing to update' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Delete
app.delete('/users/:phone', async (req, res) => {
  try {
    const db = await connectDB();
    const collection = db.collection('users');
    const result = await collection.deleteOne( { phone: parseInt(req.params.phone) });
    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Item deleted successfully' });
    } else {
      res.status(404).json({ error: 'Item not found' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`API server listening at http://localhost:${port}`);
});





// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("nodejs");
//   dbo.createCollection("users", function(err, res) {
//     if (err) throw err;
//     console.log("Collection created!");
//     db.close();
//   });
// });
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.end('Hello World!');
// }).listen(8080);