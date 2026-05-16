import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { ShoppingCart, User, LogOut, Menu, X, Sparkles } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const { user, logout } = useAuth();
  const { cartCount } = useCart();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  // Handle scroll for glassmorphism effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled 
            ? 'bg-zinc-950/80 backdrop-blur-lg border-b border-white/10 shadow-lg' 
            : 'bg-transparent border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
              <div className="bg-orange-500 p-2 rounded-xl group-hover:bg-orange-400 transition-colors">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                CRACKERS
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-all">Home</Link>
              <Link to="/products" className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-all">Products</Link>
              {user?.role === 'admin' && (
                <Link to="/admin" className="px-4 py-2 text-sm font-medium text-orange-400 hover:text-orange-300 hover:bg-orange-500/10 rounded-full transition-all">Admin Dashboard</Link>
              )}
            </div>
            
            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/cart" className="text-zinc-300 hover:text-white relative group p-2">
                <ShoppingCart className="h-6 w-6 transition-transform group-hover:scale-110" />
                {cartCount > 0 && (
                  <span className="absolute 0 top-0 right-0 bg-orange-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-zinc-950 shadow-lg shadow-orange-500/50">
                    {cartCount}
                  </span>
                )}
              </Link>

              <div className="h-6 w-px bg-white/10"></div>

              {user ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2 bg-white/5 px-3 py-1.5 rounded-full border border-white/10 text-zinc-300">
                    <User className="h-4 w-4 text-orange-500" />
                    <span className="text-sm font-medium pr-2">{user.name}</span>
                  </div>
                  <button onClick={logout} className="p-2 text-zinc-400 hover:text-red-500 hover:bg-red-500/10 rounded-full transition-all">
                    <LogOut className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <Link to="/login" className="bg-white text-zinc-950 hover:bg-zinc-200 px-6 py-2.5 rounded-full text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                  Login / Sign Up
                </Link>
              )}
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center space-x-4">
              <Link to="/cart" className="text-zinc-300 relative p-2">
                <ShoppingCart className="h-6 w-6" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 bg-orange-500 text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                    {cartCount}
                  </span>
                )}
              </Link>
              <button 
                onClick={() => setIsOpen(true)} 
                className="p-2 text-zinc-300 hover:bg-white/10 rounded-full transition-colors"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[80%] max-w-sm bg-zinc-950 border-l border-white/10 z-[60] md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 flex justify-between items-center border-b border-white/10">
                <span className="text-xl font-bold text-white">Menu</span>
                <button onClick={() => setIsOpen(false)} className="p-2 bg-white/5 rounded-full text-zinc-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-6 px-4 space-y-2">
                <Link to="/" className="block px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/5 hover:text-white font-medium transition-all">Home</Link>
                <Link to="/products" className="block px-4 py-3 rounded-xl text-zinc-300 hover:bg-white/5 hover:text-white font-medium transition-all">Products</Link>
                {user?.role === 'admin' && (
                  <Link to="/admin" className="block px-4 py-3 rounded-xl text-orange-400 hover:bg-orange-500/10 font-medium transition-all mt-4 border border-orange-500/20">Admin Dashboard</Link>
                )}
              </div>

              <div className="p-6 border-t border-white/10">
                {user ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 px-4">
                      <div className="bg-orange-500/20 p-2 rounded-full">
                        <User className="h-5 w-5 text-orange-500" />
                      </div>
                      <div>
                        <div className="text-white font-medium">{user.name}</div>
                        <div className="text-xs text-zinc-500">{user.email}</div>
                      </div>
                    </div>
                    <button 
                      onClick={logout} 
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all font-medium"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                ) : (
                  <Link to="/login" className="w-full block text-center bg-orange-600 hover:bg-orange-500 text-white py-3 rounded-xl font-bold transition-all shadow-lg shadow-orange-600/20">
                    Login / Sign Up
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
