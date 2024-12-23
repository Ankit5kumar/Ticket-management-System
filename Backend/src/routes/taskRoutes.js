const express = require('express');
const router = express.Router();
const taskController = require('../Controller/taskController');
const { verifyToken , checkBlacllist } = require('../middleware/authMiddleware');
const { authorizeRoles } = require('../middleware/roleMiddleware');

router.post('/create', verifyToken, checkBlacllist , authorizeRoles('Manager', 'Admin'), taskController.createTask);
router.get('/', verifyToken, checkBlacllist , authorizeRoles('Admin','Manager'), taskController.getAllTask);
router.put('/:task_id', verifyToken, checkBlacllist , authorizeRoles('Manager', 'Admin','User'), taskController.update);
router.delete('/:id', verifyToken,checkBlacllist , authorizeRoles('Manager', 'Admin'), taskController.deleteTask);
router.get('/ManagerTask', verifyToken,checkBlacllist ,  taskController.TaskbyManager);
router.get('/mytask', verifyToken, checkBlacllist , taskController.getTasks);



module.exports = router;