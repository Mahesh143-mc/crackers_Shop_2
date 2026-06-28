import { ShoppingCart, Heart, Info, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -8 }}
      className="group bg-white/60 dark:bg-zinc-900 border border-orange-500/10 dark:border-zinc-800 hover:border-orange-500/40 rounded-3xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-md transition-all duration-300 flex flex-col h-full backdrop-blur-sm"
    >
      <div className="relative aspect-square overflow-hidden bg-orange-50/50 dark:bg-zinc-950/50">
        {product.images?.[0] ? (
          <img 
            src={product.images[0]} 
            alt={product.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-zinc-700">
            <Sparkles className="h-10 w-10 mb-2 opacity-20" />
            <span className="text-sm font-medium">No Image</span>
          </div>
        )}
        
        {/* Floating Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isBestSeller && (
            <span className="bg-orange-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              Best Seller
            </span>
          )}
          {product.stock < 10 && product.stock > 0 && (
            <span className="bg-red-500/90 backdrop-blur-md text-white text-[10px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg">
              Only {product.stock} Left
            </span>
          )}
        </div>

        {/* Floating Actions */}
        <div className="absolute top-4 right-4 flex flex-col gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
          <button className="bg-black/40 hover:bg-orange-500 backdrop-blur-md p-2.5 rounded-full text-white transition-all shadow-xl">
            <Heart className="h-4 w-4" />
          </button>
          <button className="bg-black/40 hover:bg-zinc-700 backdrop-blur-md p-2.5 rounded-full text-white transition-all shadow-xl">
            <Info className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <span className="text-[10px] text-orange-500 font-bold uppercase tracking-widest bg-orange-500/10 px-2.5 py-1 rounded-full">
            {product.category?.name || 'Uncategorized'}
          </span>
          <span className="text-xs font-mono text-zinc-500">{product.sku}</span>
        </div>
        
        <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-2 line-clamp-1 group-hover:text-orange-400 transition-colors">
          {product.name}
        </h3>
        
        <p className="text-zinc-600 dark:text-zinc-400 text-sm mb-6 line-clamp-2 flex-1">
          {product.description}
        </p>
        
        <div className="flex items-end justify-between mt-auto">
          <div>
            <div className="text-xs text-zinc-500 mb-1">Price</div>
            <div className="text-2xl font-black text-zinc-900 dark:text-white">
              ₹{product.price}
            </div>
          </div>
          
          <button 
            onClick={() => addToCart(product)}
            disabled={product.stock === 0}
            className={`flex items-center justify-center gap-2 px-4 py-3 rounded-2xl font-bold transition-all ${
              product.stock === 0 
                ? 'bg-orange-50 dark:bg-zinc-800 text-orange-300 dark:text-zinc-500 cursor-not-allowed'
                : 'bg-orange-500 dark:bg-white hover:bg-orange-600 dark:hover:bg-orange-500 text-white dark:text-zinc-950 shadow-md hover:shadow-xl'
            }`}
          >
            <ShoppingCart className="h-5 w-5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
