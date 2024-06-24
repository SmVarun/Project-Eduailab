import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/eduLandingPage'; // Use environment variable or default

mongoose.connect(uri)
  .then(() => console.log('Connected to MongoDB (Edu Landing Page)'))
  .catch((error) => console.error('MongoDB connection error:', error));

export default mongoose.connection; // Assuming you want the default connection


