const express = require('express');
const router = express.Router();

const transactionControllers = require('../controllers/transaction-controller');

// router.post('/create',transactionControllers.addTransaction);
router.post('/match-order',transactionControllers.matchOrder);
// router.post('/market-order',transactionControllers.matchMarketOrder);
router.get('/current-price', transactionControllers.currentPrice);
router.get('/price-history',transactionControllers.priceHistory);
router.get('/get',transactionControllers.getTransactions);
// router.post('/update', userControllers.updateUser);

module.exports = router;
