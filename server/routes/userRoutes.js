const express = require('express');
const Router = express.Router();
const {authSignup, authLogin} = require('../controllers/userController');

// const { protect } = require('../middleware/authMiddleWare');
// Router.get('/', protect, getAllUser);

Router.post('/signin',authLogin);
Router.post('/signup',authSignup);


module.exports = Router