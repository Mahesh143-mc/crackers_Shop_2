import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../ProductCard';
import { motion } from 'framer-motion';
import { Loader2, Flame, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const BestSelling = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/products');
        setProducts(res.data.data.products.slice(0, 4).map(p => ({...p, isBestSeller: true})));
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchTopProducts();
  }, []);

  return (
    <section className="py-24 bg-[var(--bg-bestselling)] relative overflow-hidden border-t border-white/5">
      {/* Vibrant Background Glows */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-pink-600/10 rounded-full blur-[100px] pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-cyan-600/10 rounded-full blur-[100px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8 text-center md:text-left">
          <div className="max-w-2xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-red-500/10 to-orange-500/10 border border-red-500/20 text-red-500 dark:text-red-400 text-xs font-black uppercase tracking-widest mb-6"
            >
              <Flame className="h-4 w-4 animate-pulse" />
              <span>Trending Now</span>
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-6xl font-black text-zinc-900 dark:text-white mb-6 tracking-tighter"
            >
              BEST SELLING <span className="vibrant-gradient-text">PRODUCTS</span>
            </motion.h2>
            <p className="text-zinc-600 dark:text-zinc-400 text-lg md:text-xl font-medium">
              Hand-picked premium crackers loved by thousands of happy families.
            </p>
          </div>

          <Link 
            to="/products"
            className="group inline-flex items-center justify-center bg-white/50 dark:bg-zinc-900/50 backdrop-blur-md border border-orange-500/20 dark:border-white/10 hover:border-orange-500/50 hover:bg-orange-50 dark:hover:bg-zinc-800 text-orange-900 dark:text-white px-8 py-4 rounded-full font-black transition-all gap-2 whitespace-nowrap shadow-sm dark:shadow-none"
          >
            Explore All <Sparkles className="h-5 w-5 text-yellow-500 group-hover:rotate-12 transition-transform" />
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-80 gap-6">
            <div className="relative">
              <div className="absolute inset-0 bg-orange-500 blur-2xl opacity-20 animate-pulse"></div>
              <Loader2 className="h-12 w-12 text-orange-500 animate-spin relative z-10" />
            </div>
            <p className="text-zinc-500 font-black uppercase tracking-widest text-sm">Igniting Best Sellers...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {products.map((product, index) => (
              <motion.div
                key={product._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, type: "spring", stiffness: 100 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
};

export default BestSelling;
