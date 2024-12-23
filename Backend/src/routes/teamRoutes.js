const express = require('express');
const router = express.Router();
const { verifyToken , checkBlacllist } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');
const Team = require('../Controller/teamController')

router.post('/',verifyToken , checkBlacllist ,authorizeRoles('Admin'), Team.TeamCreation);
router.get('/',verifyToken , checkBlacllist,authorizeRoles('Admin','Manager'), Team.getTeam);

module.exports = router;