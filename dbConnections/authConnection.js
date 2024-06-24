import mongoose from 'mongoose';

const authConnection = mongoose.createConnection('mongodb://localhost:27017/auth-db', {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true, // Ensure indexes are created
});

authConnection.on('connected', () => {
  console.log('Connected to MongoDB (Auth DB)');
});

authConnection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

export default authConnection;




