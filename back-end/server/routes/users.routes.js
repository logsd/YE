const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user.controller');

router.get('/', userCtrl.getUsers);
router.post('/', userCtrl.createUser);
router.get('/:id', userCtrl.getUser);
router.put('/:id', userCtrl.editUser);
router.delete('/:id', userCtrl.deleteUser);
router.post('/login', userCtrl.loginUser)

module.exports = router;