import express from 'express';
import User from '../models/Profile.js';

const router = express.Router();

// POST change password
router.post('/', async (req, res) => {
    try {
        const { userId, currentPassword, newPassword } = req.body;

        // Fetch user from database
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check current password using bcrypt compare
        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Current password is incorrect' });
        }

        // Update user's password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password updated successfully' });
    } catch (err) {
        console.error('Error changing password:', err.message);
        res.status(500).json({ message: 'Server error' });
    }
});

export default router;
