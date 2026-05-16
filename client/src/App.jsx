import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import POS from './pages/POS';
import AdminProducts from './pages/AdminProducts';
import AdminOrders from './pages/AdminOrders';
import AdminDashboard from './pages/AdminDashboard';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Protected Route Component
const ProtectedRoute = ({ children, roles }) => {
  const { user, loading } = useAuth();

  if (loading) return <div className="h-screen w-screen flex items-center justify-center bg-zinc-950 text-white">Loading...</div>;
  if (!user) return <Navigate to="/login" />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/" />;

  return (
    <>
      {!window.location.pathname.startsWith('/admin') && <Navbar />}
      {children}
      {!window.location.pathname.startsWith('/admin') && <Footer />}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path="/products" element={
            <ProtectedRoute>
              <Products />
            </ProtectedRoute>
          } />
          <Route path="/cart" element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          } />
          <Route path="/checkout" element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          } />
          <Route path="/admin" element={
            <ProtectedRoute roles={['admin']}>
              <AdminDashboard />
            </ProtectedRoute>
          } />
          <Route path="/admin/products" element={
            <ProtectedRoute roles={['admin']}>
              <AdminProducts />
            </ProtectedRoute>
          } />
          <Route path="/admin/orders" element={
            <ProtectedRoute roles={['admin']}>
              <AdminOrders />
            </ProtectedRoute>
          } />
          <Route path="/admin/pos" element={
            <ProtectedRoute roles={['admin']}>
              <POS />
            </ProtectedRoute>
          } />
          {/* Add more admin routes here */}
        </Routes>
      </Router>
    </CartProvider>
  </AuthProvider>
  );
}

export default App;
