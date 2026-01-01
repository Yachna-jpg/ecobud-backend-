const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.log('Failed to connect to local MongoDB. Attempting to start in-memory database...');
    try {
      const mongod = await MongoMemoryServer.create();
      const uri = mongod.getUri();
      
      const conn = await mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      
      console.log(`In-Memory MongoDB Connected: ${conn.connection.host}`);
      console.log('NOTE: Data will be lost when the server stops.');
    } catch (memError) {
      console.error(`Error: ${memError.message}`);
      process.exit(1);
    }
  }
};

module.exports = connectDB;
