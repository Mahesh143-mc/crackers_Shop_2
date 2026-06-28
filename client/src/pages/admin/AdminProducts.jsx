import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import AdminLayout from '../../components/admin/AdminLayout';
import { Plus, Search, Edit2, Trash2, Package } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    stock: '',
    sku: ''
  });

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const fetchProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'products'));
      const fetchedProducts = [];
      querySnapshot.forEach((doc) => {
        fetchedProducts.push({ id: doc.id, _id: doc.id, ...doc.data() });
      });
      setProducts(fetchedProducts);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'categories'));
      const fetchedCategories = [];
      querySnapshot.forEach((doc) => {
        fetchedCategories.push({ id: doc.id, _id: doc.id, ...doc.data() });
      });
      setCategories(fetchedCategories);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Find category object to embed in product document
      const selectedCategory = categories.find(c => c._id === formData.category) || { _id: formData.category, name: formData.category };
      
      const productData = {
        ...formData,
        price: Number(formData.price),
        stock: Number(formData.stock),
        category: selectedCategory
      };

      await addDoc(collection(db, 'products'), productData);
      
      setShowModal(false);
      fetchProducts();
      setFormData({ name: '', description: '', price: '', category: '', stock: '', sku: '' });
    } catch (err) {
      console.error(err);
      alert('Error creating product');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure?')) return;
    try {
      await deleteDoc(doc(db, 'products', id));
      fetchProducts();
    } catch (err) {
      console.error(err);
      alert('Error deleting product');
    }
  };

  return (
    <AdminLayout>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Products</h1>
          <p className="text-zinc-400">Manage your product inventory</p>
        </div>
        <button 
          onClick={() => setShowModal(true)}
          className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-xl flex items-center gap-2 transition-all"
        >
          <Plus className="h-5 w-5" />
          Add Product
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-orange-500/10 rounded-xl">
              <Package className="h-6 w-6 text-orange-500" />
            </div>
            <div>
              <p className="text-zinc-400 text-sm">Total Products</p>
              <h3 className="text-2xl font-bold text-white">{products.length}</h3>
            </div>
          </div>
        </div>
        {/* Add more stats as needed */}
      </div>

      {/* Table */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden text-white">
        <table className="w-full text-left">
          <thead className="bg-zinc-800/50 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 text-sm font-medium">Product</th>
              <th className="px-6 py-4 text-sm font-medium">Category</th>
              <th className="px-6 py-4 text-sm font-medium">Price</th>
              <th className="px-6 py-4 text-sm font-medium">Stock</th>
              <th className="px-6 py-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {products.map((product) => (
              <tr key={product._id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4">
                  <div className="font-medium">{product.name}</div>
                  <div className="text-xs text-zinc-500">{product.sku}</div>
                </td>
                <td className="px-6 py-4">
                  <span className="bg-zinc-800 text-zinc-400 px-2 py-1 rounded text-xs">
                    {product.category?.name}
                  </span>
                </td>
                <td className="px-6 py-4">₹{product.price}</td>
                <td className="px-6 py-4">
                  <span className={product.stock < 10 ? 'text-red-500' : 'text-green-500'}>
                    {product.stock}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-3">
                    <button className="text-zinc-400 hover:text-white transition-colors">
                      <Edit2 className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => handleDelete(product._id)}
                      className="text-zinc-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-[100]">
          <motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl p-8"
          >
            <h2 className="text-2xl font-bold text-white mb-6">Add New Product</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Name</label>
                  <input 
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">SKU</label>
                  <input 
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white"
                    required
                    value={formData.sku}
                    onChange={(e) => setFormData({...formData, sku: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Description</label>
                <textarea 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white h-24"
                  required
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Price (₹)</label>
                  <input 
                    type="number"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({...formData, price: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-zinc-400">Stock</label>
                  <input 
                    type="number"
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white"
                    required
                    value={formData.stock}
                    onChange={(e) => setFormData({...formData, stock: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm text-zinc-400">Category</label>
                <select 
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-lg p-2.5 text-white"
                  required
                  value={formData.category}
                  onChange={(e) => setFormData({...formData, category: e.target.value})}
                >
                  <option value="">Select Category</option>
                  {categories.map(cat => (
                    <option key={cat._id} value={cat._id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div className="flex gap-4 mt-8">
                <button 
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-zinc-800 hover:bg-zinc-700 text-white font-medium py-3 rounded-xl transition-all"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 bg-orange-600 hover:bg-orange-700 text-white font-medium py-3 rounded-xl transition-all"
                >
                  Save Product
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminProducts;
