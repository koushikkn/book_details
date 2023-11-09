//const app = require('./app');
//const MongoClient = require('mongodb').MongoClient
const uri = 'mongodb+srv://koushikkn1810:6T542j8TaMPHLjXq@cluster0.q3at5zf.mongodb.net/?retryWrites=true&w=majority';

const { MongoClient } = require('mongodb');

const client = new MongoClient(uri);


//const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function connectToDatabase() {
try {
await client.connect();

console.log('Connected to MongoDB Atlas');

// You can access your database here using client.db('your-database-name')

} catch (err) {
console.error('Error connecting to MongoDB Atlas', err);
}
}

connectToDatabase();