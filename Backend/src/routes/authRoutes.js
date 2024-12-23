const express = require('express');
const router = express.Router();
const authController = require('../Controller/authController');
const {verifyToken,checkBlacllist} = require('../middleware/authMiddleware')
const apiLimiter = require('../config/rateLimiter');

router.post('/register', authController.register);
router.post('/login', checkBlacllist, apiLimiter, authController.login);
router.post('/logout', authController.logout);

module.exports = router;