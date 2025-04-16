// lib/mongodb.ts
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env');
}

let cached = (global as any).mongoose || { conn: null, promise: null };

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
    };

    try {
      cached.promise = mongoose.connect(MONGODB_URI, opts);
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
      throw new Error('Failed to connect to MongoDB');
    }
  }

  cached.conn = await cached.promise;
  (global as any).mongoose = cached;
  return cached.conn;
}

export default connectDB;
