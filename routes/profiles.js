import express from 'express';
import eduConnection from '../dbConnections/eduConnection.js'; // Import the edu connection
import profileSchema from '../models/Profile.js'; // Import the profile schema

const router = express.Router();

// Define the Profile model using the edu connection
const Profile = eduConnection.model('Profile', profileSchema);

// Get all profiles
router.get('/', async (req, res) => {
    try {
        const profiles = await Profile.find();
        res.json(profiles);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Create a new profile
router.post('/', async (req, res) => {
    const { userId, bio } = req.body;

    try {
        const newProfile = new Profile({
            userId,
            bio,
            // Add other fields here if needed
        });

        await newProfile.save();
        res.status(201).json(newProfile);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;



