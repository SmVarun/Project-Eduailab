import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// Get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.find().populate('course');
        res.json(comments);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Create a new comment
router.post('/', async (req, res) => {
    const { username, text, courseId } = req.body;

    const comment = new Comment({
        username,
        text,
        course: courseId
    });

    try {
        const newComment = await comment.save();
        res.status(201).json(newComment);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

export default router;

