const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Register a new user
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if user already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        // Hash the password        
        const hashedPassword = await bcrypt.hash(password, 10);
        // Create new user
        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });
        res.status(201).json({
            message: 'User registered successfully',
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Login user
exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        // First check if user exists
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Then compare password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ message: "Invalid email or password" });
        }

        // Generate token
        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: process.env.JWT_EXPIRES_IN }
        );

        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

