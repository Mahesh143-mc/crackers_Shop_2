import { useState, useEffect } from 'react';
import axios from 'axios';
import AdminLayout from '../components/AdminLayout';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, PieChart, Pie, Cell
} from 'recharts';
import { TrendingUp, Users, ShoppingBag, DollarSign } from 'lucide-react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalSales: 0,
    totalOrders: 0,
    totalCustomers: 0,
    revenueData: [],
    categoryData: []
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem('token');
      const [ordersRes, usersRes] = await Promise.all([
        axios.get('http://localhost:5000/api/orders', { headers: { Authorization: `Bearer ${token}` } }),
        axios.get('http://localhost:5000/api/auth/me', { headers: { Authorization: `Bearer ${token}` } }) // Just for mock
      ]);

      const orders = ordersRes.data.data.orders;
      const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);
      
      // Mock data for charts
      const revenueData = [
        { name: 'Jan', revenue: 4000 },
        { name: 'Feb', revenue: 3000 },
        { name: 'Mar', revenue: 2000 },
        { name: 'Apr', revenue: 2780 },
        { name: 'May', revenue: 1890 },
        { name: 'Jun', revenue: 2390 },
      ];

      const categoryData = [
        { name: 'Sparklers', value: 400 },
        { name: 'Rockets', value: 300 },
        { name: 'Gift Boxes', value: 300 },
        { name: 'Fancy', value: 200 },
      ];

      setStats({
        totalSales,
        totalOrders: orders.length,
        totalCustomers: 124, // Mock
        revenueData,
        categoryData
      });
    } catch (err) {
      console.error(err);
    }
  };

  const COLORS = ['#f97316', '#ef4444', '#f59e0b', '#ec4899'];

  return (
    <AdminLayout>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Dashboard Overview</h1>
        <p className="text-zinc-400">Real-time analytics and business performance</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-orange-500/10 rounded-xl">
              <DollarSign className="h-6 w-6 text-orange-500" />
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <p className="text-zinc-400 text-sm mb-1">Total Revenue</p>
          <h3 className="text-2xl font-bold text-white">₹{stats.totalSales}</h3>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
          </div>
          <p className="text-zinc-400 text-sm mb-1">Total Orders</p>
          <h3 className="text-2xl font-bold text-white">{stats.totalOrders}</h3>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Users className="h-6 w-6 text-purple-500" />
            </div>
          </div>
          <p className="text-zinc-400 text-sm mb-1">Total Customers</p>
          <h3 className="text-2xl font-bold text-white">{stats.totalCustomers}</h3>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl">
          <div className="flex items-center justify-between mb-4">
            <div className="p-3 bg-green-500/10 rounded-xl">
              <TrendingUp className="h-6 w-6 text-green-500" />
            </div>
          </div>
          <p className="text-zinc-400 text-sm mb-1">Growth Rate</p>
          <h3 className="text-2xl font-bold text-white">+12.5%</h3>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Revenue Analysis</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={stats.revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" />
                <XAxis dataKey="name" stroke="#71717a" fontSize={12} />
                <YAxis stroke="#71717a" fontSize={12} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Line type="monotone" dataKey="revenue" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl">
          <h2 className="text-xl font-bold text-white mb-6">Sales by Category</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={stats.categoryData}
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {stats.categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '12px' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 mt-4">
            {stats.categoryData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[index % COLORS.length] }} />
                <span className="text-sm text-zinc-400">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
