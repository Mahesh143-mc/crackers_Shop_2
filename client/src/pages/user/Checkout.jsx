import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { db } from '../../firebase';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { CreditCard, Truck, CheckCircle, Loader2 } from 'lucide-react';

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [formData, setFormData] = useState({
    street: '',
    city: '',
    state: '',
    zipCode: '',
    phone: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const orderData = {
        user: user ? { uid: user.id, name: user.name, email: user.email } : null,
        items: cart.map(item => ({
          product: item._id || item.id,
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: cartTotal,
        shippingAddress: formData,
        orderStatus: 'pending',
        createdAt: new Date().toISOString()
      };

      await addDoc(collection(db, 'orders'), orderData);

      setOrderSuccess(true);
      clearCart();
      setTimeout(() => navigate('/'), 3000);
    } catch (err) {
      console.error(err);
      alert('Order placement failed');
    } finally {
      setLoading(false);
    }
  };

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-zinc-950 flex items-center justify-center p-4 text-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-zinc-900 p-12 rounded-3xl border border-zinc-800"
        >
          <div className="bg-green-500/20 p-4 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="h-10 w-10 text-green-500" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-4">Order Successful!</h2>
          <p className="text-zinc-400 text-lg">Thank you for your purchase. Redirecting you home...</p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-950 pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-black text-white mb-12 tracking-tight">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <Truck className="h-6 w-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-white">Shipping Details</h2>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-zinc-400 mb-2">Street Address</label>
                  <input 
                    required
                    className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                    value={formData.street}
                    onChange={(e) => setFormData({...formData, street: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">City</label>
                    <input 
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                      value={formData.city}
                      onChange={(e) => setFormData({...formData, city: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">State</label>
                    <input 
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                      value={formData.state}
                      onChange={(e) => setFormData({...formData, state: e.target.value})}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Zip Code</label>
                    <input 
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                      value={formData.zipCode}
                      onChange={(e) => setFormData({...formData, zipCode: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-zinc-400 mb-2">Phone Number</label>
                    <input 
                      required
                      className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 text-white focus:ring-2 focus:ring-orange-500 outline-none"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="h-6 w-6 text-orange-500" />
                <h2 className="text-2xl font-bold text-white">Payment Method</h2>
              </div>
              <div className="p-4 bg-orange-600/10 border border-orange-500/50 rounded-xl text-orange-500 text-sm">
                For this demo, we only support **Cash on Delivery**. Online payments will be integrated in the next phase.
              </div>
            </div>

            <button 
              type="submit"
              disabled={loading || cart.length === 0}
              className="w-full bg-orange-600 hover:bg-orange-700 text-white py-4 rounded-xl font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <Loader2 className="animate-spin h-6 w-6" /> : `Place Order (₹${cartTotal})`}
            </button>
          </form>

          {/* Order Summary Sidebar */}
          <div className="space-y-6">
            <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
              <h2 className="text-2xl font-bold text-white mb-6">Your Order</h2>
              <div className="space-y-4 max-h-[400px] overflow-y-auto mb-6 pr-2 custom-scrollbar">
                {cart.map(item => (
                  <div key={item._id} className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-zinc-800 rounded-lg overflow-hidden shrink-0">
                        {item.images?.[0] && <img src={item.images[0]} className="w-full h-full object-cover" />}
                      </div>
                      <div>
                        <p className="text-white font-medium line-clamp-1">{item.name}</p>
                        <p className="text-zinc-500 text-xs">{item.quantity} x ₹{item.price}</p>
                      </div>
                    </div>
                    <div className="text-white font-bold">₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>
              <div className="border-t border-zinc-800 pt-4 mt-4 flex justify-between text-white font-bold text-xl">
                <span>Total</span>
                <span>₹{cartTotal}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
