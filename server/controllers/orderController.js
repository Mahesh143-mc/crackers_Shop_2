const Order = require('../models/Order');
const Product = require('../models/Product');

exports.createOrder = async (req, res) => {
  try {
    const { items, totalAmount, shippingAddress } = req.body;

    // Check stock and update
    for (const item of items) {
      const product = await Product.findById(item.product);
      if (!product || product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product?.name || 'unknown product'}` });
      }
      product.stock -= item.quantity;
      await product.save();
    }

    const order = await Order.create({
      user: req.user._id,
      items,
      totalAmount,
      shippingAddress
    });

    res.status(201).json({ status: 'success', data: { order } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort('-createdAt').populate('items.product');
    res.status(200).json({ status: 'success', data: { orders } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort('-createdAt').populate('user items.product');
    res.status(200).json({ status: 'success', data: { orders } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { orderStatus: req.body.status }, { new: true });
    res.status(200).json({ status: 'success', data: { order } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
