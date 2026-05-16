const express = require('express');
const orderController = require('../controllers/orderController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

router.use(protect);

router.post('/', orderController.createOrder);
router.get('/my-orders', orderController.getMyOrders);

// Admin only
router.get('/', restrictTo('admin'), orderController.getAllOrders);
router.patch('/:id/status', restrictTo('admin'), orderController.updateOrderStatus);

module.exports = router;
