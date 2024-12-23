const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const { verifyToken , checkBlacllist} = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.get('/profile', verifyToken, checkBlacllist, userController.getProfile);
router.get('/',verifyToken,authorizeRoles('Admin','Manager'), checkBlacllist ,userController.getProfile)
router.get('/:_id',verifyToken,authorizeRoles('Admin','Manager'),checkBlacllist,userController.ProfileById)
router.get('/AllUser',verifyToken,authorizeRoles('Admin'), checkBlacllist,userController.AllUser)
module.exports = router;