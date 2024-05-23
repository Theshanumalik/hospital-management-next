declare global {
  var mongoose: MongooseConnection;
}

import mongoose, { Connection } from "mongoose";

const MONGODB_URI = process.env.MONGO_URI as string;

if (!MONGODB_URI) throw new Error("MONGODB_URI not defined");

interface MongooseConnection {
  conn?: Connection;
  promise?: Promise<Connection>;
}

let cached: MongooseConnection = (global.mongoose || {}) as MongooseConnection;

async function dbConnect(): Promise<Connection> {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI).then(() => {
      return mongoose.connection;
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default dbConnect;
