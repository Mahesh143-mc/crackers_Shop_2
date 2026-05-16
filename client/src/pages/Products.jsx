import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import { Search, SlidersHorizontal, Loader2, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [activeCategory]);

  const fetchCategories = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/products/categories');
      setCategories(res.data.data.categories);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const url = activeCategory 
        ? `http://localhost:5000/api/products?category=${activeCategory}`
        : 'http://localhost:5000/api/products';
      const res = await axios.get(url);
      setProducts(res.data.data.products);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-32 pb-20 bg-[var(--bg-main)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-8">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-zinc-600 dark:text-zinc-300 text-xs font-medium mb-4"
            >
              <Sparkles className="h-3 w-3 text-orange-500" />
              <span>Premium Selection</span>
            </motion.div>
            <h1 className="text-4xl md:text-5xl font-black text-zinc-900 dark:text-white mb-4 tracking-tight">Our Collection</h1>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg">Discover the perfect crackers for your celebration. Handpicked for quality and safety.</p>
          </div>

          <div className="flex w-full md:w-auto gap-3">
            <div className="relative flex-1 md:w-72">
              <Search className="absolute left-4 top-3.5 h-5 w-5 text-zinc-500" />
              <input 
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-white dark:bg-zinc-900 border border-black/10 dark:border-zinc-800 text-zinc-900 dark:text-white pl-12 pr-4 py-3 rounded-2xl focus:ring-2 focus:ring-orange-500 focus:border-transparent outline-none transition-all shadow-sm dark:shadow-inner"
              />
            </div>
            <button className="bg-white dark:bg-zinc-900 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-black/10 dark:border-zinc-800 p-3 rounded-2xl text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-all shrink-0 shadow-sm dark:shadow-none">
              <SlidersHorizontal className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Categories Pill Menu */}
        <div className="relative mb-12">
          <div className="flex overflow-x-auto gap-3 pb-4 no-scrollbar -mx-4 px-4 sm:mx-0 sm:px-0">
            <button 
              onClick={() => setActiveCategory('')}
              className={`px-6 py-3 rounded-2xl whitespace-nowrap transition-all font-bold text-sm shadow-sm ${
                activeCategory === '' 
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 scale-105 shadow-md' 
                : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-black/10 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-white'
              }`}
            >
              All Products
            </button>
            {categories.map(cat => (
              <button 
                key={cat._id}
                onClick={() => setActiveCategory(cat._id)}
                className={`px-6 py-3 rounded-2xl whitespace-nowrap transition-all font-bold text-sm shadow-sm ${
                  activeCategory === cat._id 
                  ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-950 scale-105 shadow-md' 
                  : 'bg-white dark:bg-zinc-900 text-zinc-600 dark:text-zinc-400 hover:bg-zinc-50 dark:hover:bg-zinc-800 border border-black/10 dark:border-zinc-800 hover:text-zinc-900 dark:hover:text-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
          {/* Fade effect for scroll */}
          <div className="absolute right-0 top-0 bottom-4 w-12 bg-gradient-to-l from-[var(--bg-main)] to-transparent pointer-events-none sm:hidden"></div>
        </div>

        {/* Product Grid */}
        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 gap-4">
            <Loader2 className="h-10 w-10 text-orange-500 animate-spin" />
            <p className="text-zinc-500 font-medium">Loading collection...</p>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        )}

        {!loading && filteredProducts.length === 0 && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-32 bg-white/60 dark:bg-zinc-900/50 border border-black/5 dark:border-zinc-800 rounded-3xl backdrop-blur-sm shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none"
          >
            <div className="bg-zinc-100 dark:bg-zinc-800 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-zinc-500" />
            </div>
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-2">No products found</h3>
            <p className="text-zinc-600 dark:text-zinc-500 text-lg max-w-md mx-auto">We couldn't find anything matching "{search}". Try adjusting your filters or search term.</p>
            <button 
              onClick={() => {setSearch(''); setActiveCategory('');}}
              className="mt-8 bg-zinc-900 dark:bg-zinc-800 hover:bg-zinc-800 dark:hover:bg-zinc-700 text-white px-6 py-3 rounded-full font-medium transition-all"
            >
              Clear all filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Products;
