const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');

const app = express();
const port = 5000;  // You can change this port number if needed
const uri = "mongodb+srv://sivakumarwizinoa:siva1208@cluster0.rn8ax.mongodb.net/";

app.use(cors());
app.use(express.json());

// Connect to MongoDB
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Test database connection
async function connectMongo() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
}

connectMongo();

const db = client.db('test_db');
const collection = db.collection('test_collection');

// Define Routes for CRUD operations

// CREATE: Add a new user
app.post('/user', async (req, res) => {
  const user = req.body;
  const result = await collection.insertOne(user);
  res.status(201).json(result);
});

// READ: Get all users
app.get('/users', async (req, res) => {
  const users = await collection.find().toArray();
  res.status(200).json(users);
});

// UPDATE: Update a user
app.put('/user/:id', async (req, res) => {
  const { id } = req.params;
  const updatedUser = req.body;
  const result = await collection.updateOne({ _id: new MongoClient.ObjectID(id) }, { $set: updatedUser });
  res.status(200).json(result);
});

// DELETE: Delete a user
app.delete('/user/:id', async (req, res) => {
  const { id } = req.params;
  const result = await collection.deleteOne({ _id: new MongoClient.ObjectID(id) });
  res.status(200).json(result);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
