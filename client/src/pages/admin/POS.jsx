import { useState, useEffect, useRef } from 'react';
import { db } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Printer, 
  Plus, 
  Minus, 
  Trash2, 
  ScanLine,
  ChevronRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const POS = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [cart, setCart] = useState([]);
  const [customerName, setCustomerName] = useState('Walk-in Customer');
  const [discount, setDiscount] = useState(0);
  const searchRef = useRef(null);

  useEffect(() => {
    fetchProducts();
    // Focus search on mount
    searchRef.current?.focus();
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
    }
  };

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item._id === product._id);
      if (existing) {
        return prev.map(item => 
          item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setSearch('');
    searchRef.current?.focus();
  };

  const updateQuantity = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item._id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item._id !== id));
  };

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + gst - discount;

  const handlePrint = () => {
    window.print();
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.sku?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="h-[100dvh] bg-zinc-950 flex flex-col lg:flex-row overflow-hidden">
      {/* Mobile Header (Only visible on small screens) */}
      <div className="lg:hidden bg-zinc-900 border-b border-zinc-800 p-4 flex items-center justify-between z-10 shadow-md">
        <h1 className="text-white font-bold flex items-center gap-2">
          <ScanLine className="h-5 w-5 text-orange-500" /> POS Billing
        </h1>
        <div className="bg-orange-500/10 text-orange-500 px-3 py-1 rounded-full text-xs font-bold border border-orange-500/20">
          ₹{total.toFixed(2)}
        </div>
      </div>

      {/* Left Side: Product Selection */}
      <div className="flex-1 flex flex-col p-4 sm:p-6 lg:border-r border-zinc-800 h-1/2 lg:h-full overflow-hidden">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-zinc-500" />
            <input 
              ref={searchRef}
              type="text"
              placeholder="Search Product..."
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-10 pr-4 py-3 text-white focus:ring-2 focus:ring-orange-500 outline-none transition-all shadow-inner text-sm sm:text-base"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && filteredProducts.length === 1) {
                  addToCart(filteredProducts[0]);
                }
              }}
            />
            {search && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl z-50 max-h-60 overflow-y-auto">
                {filteredProducts.map(p => (
                  <button 
                    key={p._id}
                    onClick={() => addToCart(p)}
                    className="w-full flex items-center justify-between p-4 hover:bg-zinc-800 border-b border-zinc-800 last:border-0 text-left"
                  >
                    <div>
                      <div className="text-white font-medium">{p.name}</div>
                      <div className="text-xs text-zinc-500">{p.sku}</div>
                    </div>
                    <div className="text-orange-500 font-bold">₹{p.price}</div>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button className="bg-zinc-900 border border-zinc-800 p-3.5 rounded-xl text-zinc-400 hover:text-white transition-colors shrink-0">
            <ScanLine className="h-5 w-5 sm:h-6 sm:w-6" />
          </button>
        </div>

        {/* Categories / Quick Select */}
        <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 overflow-y-auto pr-2 custom-scrollbar pb-4">
          {products.map(p => (
            <motion.button 
              key={p._id}
              whileTap={{ scale: 0.95 }}
              onClick={() => addToCart(p)}
              className="bg-zinc-900/50 border border-zinc-800 p-3 sm:p-4 rounded-xl sm:rounded-2xl text-left hover:border-orange-500/50 transition-all group flex flex-col h-full"
            >
              <div className="text-[10px] sm:text-xs text-zinc-500 mb-1 line-clamp-1">{p.category?.name}</div>
              <div className="text-sm sm:text-base text-white font-bold mb-2 line-clamp-2 group-hover:text-orange-500 transition-colors flex-1">{p.name}</div>
              <div className="text-base sm:text-lg font-black text-white mt-auto">₹{p.price}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Right Side: Billing Cart */}
      <div className="w-full lg:w-[450px] bg-zinc-900/80 border-t lg:border-t-0 lg:border-l border-zinc-800 flex flex-col p-4 sm:p-6 h-1/2 lg:h-full z-20 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] lg:shadow-none relative">
        <div className="flex items-center justify-between mb-4 sm:mb-6">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2 bg-zinc-800 rounded-lg shrink-0">
              <User className="h-4 w-4 sm:h-5 sm:w-5 text-orange-500" />
            </div>
            <input 
              className="bg-transparent border-b border-zinc-800 text-white font-bold focus:border-orange-500 focus:ring-0 w-full outline-none py-1 text-sm sm:text-base transition-colors"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              placeholder="Customer Name"
            />
          </div>
          <div className="text-zinc-500 text-xs sm:text-sm font-mono ml-4 bg-zinc-950 px-2 py-1 rounded shrink-0">#{Date.now().toString().slice(-6)}</div>
        </div>

        <div className="flex-1 overflow-y-auto mb-4 sm:mb-6 pr-2 custom-scrollbar space-y-3">
          <AnimatePresence>
            {cart.map(item => (
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0, padding: 0 }}
                key={item._id}
                className="bg-zinc-950 border border-zinc-800 p-3 sm:p-4 rounded-xl flex items-center justify-between gap-2 overflow-hidden"
              >
                <div className="flex-1 min-w-0">
                  <div className="text-white font-bold text-xs sm:text-sm mb-1 truncate">{item.name}</div>
                  <div className="text-[10px] sm:text-xs text-zinc-500">₹{item.price} / unit</div>
                </div>
                <div className="flex items-center gap-2 sm:gap-4 shrink-0">
                  <div className="flex items-center bg-zinc-900 border border-zinc-800 rounded-lg p-0.5">
                    <button 
                      onClick={() => updateQuantity(item._id, -1)}
                      className="p-1 sm:p-1.5 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                    >
                      <Minus className="h-3 w-3" />
                    </button>
                    <span className="text-white font-bold text-xs sm:text-sm w-6 text-center">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item._id, 1)}
                      className="p-1 sm:p-1.5 hover:bg-zinc-800 rounded text-zinc-400 hover:text-white transition-colors"
                    >
                      <Plus className="h-3 w-3" />
                    </button>
                  </div>
                  <div className="text-white font-bold text-xs sm:text-sm w-12 text-right">
                    ₹{item.price * item.quantity}
                  </div>
                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="text-zinc-600 hover:text-red-500 transition-colors p-1"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          {cart.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-zinc-600 space-y-4 py-10 opacity-50">
              <div className="w-16 h-16 rounded-full bg-zinc-800 flex items-center justify-center">
                <ShoppingCart className="h-8 w-8 text-zinc-500" />
              </div>
              <p className="font-medium text-sm">Cart is empty</p>
            </div>
          )}
        </div>

        {/* Calculation */}
        <div className="border-t border-zinc-800 pt-4 sm:pt-6 space-y-2 sm:space-y-3 bg-zinc-900/90 backdrop-blur-md">
          <div className="flex justify-between text-zinc-400 text-xs sm:text-sm">
            <span>Subtotal</span>
            <span>₹{subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-zinc-400 text-xs sm:text-sm">
            <span>GST (18%)</span>
            <span>₹{gst.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-zinc-400 text-xs sm:text-sm items-center">
            <span>Discount</span>
            <div className="relative">
              <span className="absolute left-2 top-1.5 sm:top-2 text-zinc-500">₹</span>
              <input 
                type="number"
                className="bg-zinc-950 border border-zinc-800 text-right rounded-lg w-20 sm:w-24 pl-6 pr-2 py-1 sm:py-1.5 text-white outline-none focus:border-orange-500 transition-colors"
                value={discount || ''}
                onChange={(e) => setDiscount(Number(e.target.value))}
                placeholder="0"
              />
            </div>
          </div>
          <div className="border-t border-zinc-800 pt-3 flex justify-between text-white font-black text-xl sm:text-2xl items-center mt-2">
            <span>Total</span>
            <span className="text-orange-500 bg-orange-500/10 px-3 py-1 rounded-xl border border-orange-500/20">₹{total.toFixed(2)}</span>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-3 mt-4 sm:mt-6">
          <button 
            onClick={handlePrint}
            disabled={cart.length === 0}
            className="col-span-1 bg-zinc-800 hover:bg-zinc-700 disabled:opacity-50 text-white p-3 sm:p-4 rounded-xl flex flex-col items-center justify-center gap-1 sm:gap-2 transition-all font-medium text-xs sm:text-sm"
          >
            <Printer className="h-4 w-4 sm:h-5 sm:w-5 text-zinc-400" />
            Print
          </button>
          <button 
            disabled={cart.length === 0}
            className="col-span-2 bg-orange-600 hover:bg-orange-500 disabled:opacity-50 disabled:hover:bg-orange-600 text-white p-3 sm:p-4 rounded-xl font-bold flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(234,88,12,0.3)] transition-all text-sm sm:text-base"
          >
            Complete Order
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>

      {/* Print Overlay (Hidden on Screen) */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          .print-area, .print-area * { visibility: visible; }
          .print-area { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default POS;
