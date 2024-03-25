const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// POST request to login and generate JWT token
router.post('/login', authController.login);

module.exports = router;
