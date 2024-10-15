import express from 'express';
import User from '../models/user.js'; // Ensure the .js extension is present

const router = express.Router();

// API endpoint to save user data
router.post('/', async (req, res) => {
    try {
        const { name, email, picture, userId, clientId } = req.body;
        const newUser = new User({ name, email, picture, userId, clientId });
        await newUser.save();
        res.status(201).json({ message: 'User saved successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Failed to save user data' });
    }
});

// Export the router with ES module syntax
export default router;
