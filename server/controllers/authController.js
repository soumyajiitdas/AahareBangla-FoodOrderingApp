const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Generate JWT Token
const generateToken = (id, rememberMe = false) => {
    const expiresIn = rememberMe ? process.env.JWT_EXPIRE_REMEMBER : process.env.JWT_EXPIRE;
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn
    });
};

// Register user
const register = async (req, res) => {
    const { name, email, password, phone, address } = req.body;

    try {
        // Check if all fields are provided
        if (!name || !email || !password || !phone || !address) {
            return res.status(400).json({ message: 'Please provide all required fields' });
        }

        // Check password length
        if (password.length < 6) {
            return res.status(400).json({ message: 'Password must be at least 6 characters' });
        }

        // Check if user already exists
        const userExists = await User.findOne({ $or: [{ email }, { phone }] });
        
        if (userExists) {
            if (userExists.email === email) {
                return res.status(400).json({ message: 'Email already registered' });
            }
            if (userExists.phone === phone) {
                return res.status(400).json({ message: 'Phone number already registered' });
            }
        }

        // Create user
        const user = await User.create({
            name,
            email,
            password,
            phone,
            address
        });

        const token = generateToken(user._id);

        res.status(201).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        });
    } catch (err) {
        // Handle duplicate key errors
        if (err.code === 11000) {
            const field = Object.keys(err.keyPattern)[0];
            return res.status(400).json({ message: `${field.charAt(0).toUpperCase() + field.slice(1)} already registered` });
        }
        res.status(500).json({ message: err.message });
    }
};

// Login user
const login = async (req, res) => {
    const { email, password, rememberMe } = req.body;

    try {
        // Validate email and password
        if (!email || !password) {
            return res.status(400).json({ message: 'Please provide email and password' });
        }

        // Check for user (include password field)
        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password matches
        const isMatch = await user.comparePassword(password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        const token = generateToken(user._id, rememberMe);

        res.status(200).json({
            success: true,
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get current user
const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        
        res.status(200).json({
            success: true,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                createdAt: user.createdAt
            }
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    register,
    login,
    getMe
};