const express = require('express');
const UserController = require('../controllers/userController');

const router = express.Router();

router.post('/', UserController.register);
router.get('/:id', UserController.getUser);

module.exports = router;
