import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { Eye, CheckCircle, Truck, Clock, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get('http://localhost:5000/api/orders', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setOrders(res.data.data.orders);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:5000/api/orders/${id}/status`, { status }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchOrders();
    } catch (err) {
      alert('Error updating status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'text-yellow-500 bg-yellow-500/10';
      case 'processing': return 'text-blue-500 bg-blue-500/10';
      case 'shipped': return 'text-purple-500 bg-purple-500/10';
      case 'delivered': return 'text-green-500 bg-green-500/10';
      case 'cancelled': return 'text-red-500 bg-red-500/10';
      default: return 'text-zinc-500 bg-zinc-500/10';
    }
  };

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Orders</h1>
        <p className="text-zinc-400">Manage customer orders and shipments</p>
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden text-white">
        <table className="w-full text-left">
          <thead className="bg-zinc-800/50 border-b border-zinc-800">
            <tr>
              <th className="px-6 py-4 text-sm font-medium">Order ID</th>
              <th className="px-6 py-4 text-sm font-medium">Customer</th>
              <th className="px-6 py-4 text-sm font-medium">Items</th>
              <th className="px-6 py-4 text-sm font-medium">Total</th>
              <th className="px-6 py-4 text-sm font-medium">Status</th>
              <th className="px-6 py-4 text-sm font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800">
            {orders.map((order) => (
              <tr key={order._id} className="hover:bg-zinc-800/30 transition-colors">
                <td className="px-6 py-4 text-xs font-mono text-zinc-500">
                  #{order._id.slice(-8).toUpperCase()}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium">{order.user?.name}</div>
                  <div className="text-xs text-zinc-500">{order.user?.email}</div>
                </td>
                <td className="px-6 py-4 text-sm text-zinc-400">
                  {order.items.length} items
                </td>
                <td className="px-6 py-4 font-bold">₹{order.totalAmount}</td>
                <td className="px-6 py-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.orderStatus)}`}>
                    {order.orderStatus.charAt(0).toUpperCase() + order.orderStatus.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-2">
                    <button 
                      onClick={() => updateStatus(order._id, 'processing')}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all"
                      title="Mark as Processing"
                    >
                      <Clock className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => updateStatus(order._id, 'shipped')}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all"
                      title="Mark as Shipped"
                    >
                      <Truck className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => updateStatus(order._id, 'delivered')}
                      className="p-2 bg-zinc-800 hover:bg-zinc-700 rounded-lg text-zinc-400 hover:text-white transition-all"
                      title="Mark as Delivered"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
};

export default AdminOrders;
