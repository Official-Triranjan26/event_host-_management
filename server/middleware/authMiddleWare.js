// middleware/auth.js
const jwt = require('jsonwebtoken');
const User = require("../models/userAdminModel");

// const JWT_SECRET = process.env.JWT_SECRET;

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
        return res.status(401).send('Access denied');
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid token');
    }
};

const authorize = (role) => {
    return (req, res, next) => {
        if (req.user.userRole != role) {
            // console.log(req);
            return res.status(403).json({
                "message":"access forbidden",
                "user trying to access service":req.user.userRole,
                "accessible for only ":role
            });
        }
        next();
    };
};

module.exports = { authenticate, authorize };