import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cart.length === 0) {
    return (
      <div className="min-h-[80vh] flex flex-col items-center justify-center text-white p-4">
        <div className="bg-zinc-900 p-8 rounded-full mb-6">
          <ShoppingBag className="h-16 w-16 text-zinc-700" />
        </div>
        <h2 className="text-3xl font-bold mb-4">Your cart is empty</h2>
        <p className="text-zinc-500 mb-8">Looks like you haven't added anything to your cart yet.</p>
        <Link 
          to="/products" 
          className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3 rounded-full font-bold transition-all"
        >
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-black text-white mb-12 tracking-tight">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item._id}
                className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col sm:flex-row items-center gap-6"
              >
                <div className="w-24 h-24 bg-zinc-800 rounded-xl overflow-hidden shrink-0">
                  {item.images?.[0] && (
                    <img src={item.images[0]} alt={item.name} className="w-full h-full object-cover" />
                  )}
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-bold text-white mb-1">{item.name}</h3>
                  <p className="text-zinc-500 text-sm mb-4 line-clamp-1">{item.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4 bg-zinc-800 p-1.5 rounded-lg">
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        className="p-1 hover:bg-zinc-700 rounded transition-colors text-zinc-400 hover:text-white"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span className="text-white font-bold w-6 text-center">{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-1 hover:bg-zinc-700 rounded transition-colors text-zinc-400 hover:text-white"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="text-xl font-bold text-white">₹{item.price * item.quantity}</div>
                  </div>
                </div>

                <button 
                  onClick={() => removeFromCart(item._id)}
                  className="p-2 text-zinc-500 hover:text-red-500 transition-colors self-start"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl sticky top-24">
              <h2 className="text-2xl font-bold text-white mb-6">Order Summary</h2>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-zinc-400">
                  <span>Subtotal</span>
                  <span>₹{cartTotal}</span>
                </div>
                <div className="flex justify-between text-zinc-400">
                  <span>Shipping</span>
                  <span className="text-green-500">Free</span>
                </div>
                <div className="border-t border-zinc-800 pt-4 flex justify-between text-white font-bold text-xl">
                  <span>Total</span>
                  <span>₹{cartTotal}</span>
                </div>
              </div>

              <Link 
                to="/checkout" 
                className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
              >
                Checkout <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
