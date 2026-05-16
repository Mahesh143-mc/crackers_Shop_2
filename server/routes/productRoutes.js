const express = require('express');
const productController = require('../controllers/productController');
const { protect, restrictTo } = require('../middleware/auth');

const router = express.Router();

// Public routes
router.get('/', productController.getAllProducts);
router.get('/categories', productController.getAllCategories);
router.get('/:id', productController.getProduct);

// Admin only routes
router.post('/', protect, restrictTo('admin'), productController.createProduct);
router.patch('/:id', protect, restrictTo('admin'), productController.updateProduct);
router.delete('/:id', protect, restrictTo('admin'), productController.deleteProduct);
router.post('/categories', protect, restrictTo('admin'), productController.createCategory);

module.exports = router;
