import express from 'express';

//It can use for user data security and website security
import cors from 'cors';

// Body-parser is a middleware commonly used in Node.js web applications built with frameworks like Express.js.
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Import MongoDB connections
const authConnection = mongoose.createConnection('mongodb://localhost:27017/auth-db');

const eduConnection = mongoose.createConnection('mongodb://localhost:27017/eduLandingPage');

// Event listeners for connections
authConnection.on('connected', () => {
    console.log('Connected to MongoDB (Auth DB)');
});

eduConnection.on('connected', () => {
    console.log('Connected to MongoDB (Edu Landing Page)');
});

authConnection.on('error', (err) => {
    console.error('MongoDB Auth connection error:', err);
});

eduConnection.on('error', (err) => {
    console.error('MongoDB Edu connection error:', err);
});

// Define schemas
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const profileSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    bio: { type: String }
    // Add other fields as needed
});

// Register models
const User = authConnection.model('User', userSchema);
const Profile = eduConnection.model('Profile', profileSchema);

// Create express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Serve static files from the 'public' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Routes setup (adjust as per your route structure)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

//routes for handling requests
app.post('/api/auth/register', async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});



    


























