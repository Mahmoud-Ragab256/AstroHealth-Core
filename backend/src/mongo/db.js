import mongoose from 'mongoose';

let pending;
export default async function connectDB() {
  if (mongoose.connection.readyState === 1) return mongoose;
  if (!process.env.MONGODB_URI) throw new Error('MONGODB_URI is not configured');
  if (!pending) {
    pending = mongoose.connect(process.env.MONGODB_URI, {
      maxPoolSize: 5, serverSelectionTimeoutMS: 8000, connectTimeoutMS: 8000
    }).catch(error => { pending = null; throw error; });
  }
  const connection = await pending;
  pending = null;
  return connection;
}
