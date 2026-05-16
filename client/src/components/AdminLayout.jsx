import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingBag, 
  Users, 
  BarChart3, 
  Settings,
  Plus,
  ScanLine,
  Menu,
  X,
  LogOut,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();

  const menuItems = [
    { icon: LayoutDashboard, label: 'Overview', path: '/admin' },
    { icon: Package, label: 'Products', path: '/admin/products' },
    { icon: ScanLine, label: 'POS Billing', path: '/admin/pos' },
    { icon: ShoppingBag, label: 'Orders', path: '/admin/orders' },
    // { icon: Users, label: 'Customers', path: '/admin/customers' },
    // { icon: BarChart3, label: 'Analytics', path: '/admin/analytics' },
    // { icon: Settings, label: 'Settings', path: '/admin/settings' },
  ];

  const SidebarContent = () => (
    <>
      <div className="p-6 flex items-center justify-between border-b border-zinc-800">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-orange-500 p-2 rounded-xl group-hover:bg-orange-400 transition-colors">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-black tracking-tight text-white">
            ADMIN
          </span>
        </Link>
        <button className="lg:hidden p-2 text-zinc-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
          <X className="h-5 w-5" />
        </button>
      </div>
      
      <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              onClick={() => setIsSidebarOpen(false)}
              className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all font-medium ${
                isActive 
                  ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20 shadow-sm' 
                  : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50 border border-transparent'
              }`}
            >
              <item.icon className={`h-5 w-5 ${isActive ? 'text-orange-500' : 'text-zinc-500'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-6 border-t border-zinc-800">
        <button 
          onClick={() => {
            logout();
            navigate('/login');
          }}
          className="w-full flex items-center justify-center space-x-2 bg-zinc-800 hover:bg-red-500/10 hover:text-red-500 text-zinc-400 px-4 py-3 rounded-xl transition-all font-medium border border-transparent hover:border-red-500/20"
        >
          <LogOut className="h-5 w-5" />
          <span>Logout</span>
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-zinc-950 flex font-sans text-zinc-50">
      
      {/* Mobile Top Header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800 z-40 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="bg-orange-500 p-1.5 rounded-lg">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-black tracking-tight text-white">ADMIN</span>
        </div>
        <button onClick={() => setIsSidebarOpen(true)} className="p-2 text-zinc-400 hover:text-white">
          <Menu className="h-6 w-6" />
        </button>
      </div>

      {/* Desktop Sidebar */}
      <aside className="w-72 bg-zinc-900/50 border-r border-zinc-800 hidden lg:flex flex-col sticky top-0 h-screen overflow-hidden">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 left-0 bottom-0 w-[80%] max-w-sm bg-zinc-950 border-r border-zinc-800 z-[60] lg:hidden shadow-2xl flex flex-col"
            >
              <SidebarContent />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content Area */}
      <main className="flex-1 w-full flex flex-col min-h-screen pt-16 lg:pt-0">
        <div className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="w-full h-full"
          >
            {children}
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default AdminLayout;
