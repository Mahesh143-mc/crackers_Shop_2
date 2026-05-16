const Product = require('../models/Product');
const Category = require('../models/Category');

// Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json({ status: 'success', data: { categories } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json({ status: 'success', data: { category } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

// Products
exports.getAllProducts = async (req, res) => {
  try {
    const { category, search, sort } = req.query;
    let query = {};

    if (category) query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };

    let products = Product.find(query).populate('category');

    if (sort) {
      const sortBy = sort.split(',').join(' ');
      products = products.sort(sortBy);
    } else {
      products = products.sort('-createdAt');
    }

    const results = await products;
    res.status(200).json({ status: 'success', results: results.length, data: { products: results } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate('category');
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ status: 'success', data: { product } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.status(201).json({ status: 'success', data: { product } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(200).json({ status: 'success', data: { product } });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.status(204).json({ status: 'success', data: null });
  } catch (err) {
    res.status(400).json({ status: 'fail', message: err.message });
  }
};
