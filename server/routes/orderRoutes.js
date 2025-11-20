
const express = require('express');
const router = express.Router();
const { placeOrder, getBill } = require('../controllers/orderController');

router.post('/', placeOrder);
router.get('/:orderId/bill', getBill);

module.exports = router;
