import express from 'express';
import userController from '../controller/userController.js';
const router = express.Router();


router.get('/', userController.getAllEmployees);
router.post('/', userController.createEmployee);
router.get('/:id', userController.getEmployeeById);
router.put('/:id', userController.updateEmployee);
router.delete('/:id', userController.deleteEmployee);
router.post('/login', userController.loginEmployee);


module.exports = router;