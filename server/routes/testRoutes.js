const express = require('express');
const Router = express.Router();
const {authenticate,authorize} = require("../middleware/authMiddleWare")
const {test1,test2} = require("../controllers/testController");

Router.get('/test1', authenticate, authorize('admin'), test1);
Router.get('/test2', authenticate, authorize('user'), test2);

module.exports = Router