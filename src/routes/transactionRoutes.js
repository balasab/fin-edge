const express = require('express');
const TransactionController = require('../controllers/transactionController');
const { validateTransaction } = require('../middleware/validator');

const router = express.Router();

router.post('/', validateTransaction, TransactionController.create);
router.get('/', TransactionController.getAll);
router.get('/:id', TransactionController.getOne);
router.patch('/:id', TransactionController.update);
router.delete('/:id', TransactionController.delete);

module.exports = router;
