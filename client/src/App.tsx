import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import './App.css'

// ==========================================
// IMPORT YOUR PAGES HERE
// ==========================================

// admin Pages
import LoginPage from './Admin/Auth/Login.tsx';
import Dashboard from './Admin/pages/dashboard.tsx';
import ProductsPage from './Admin/pages/Product.tsx';
import OrdersPage from './Admin/pages/order.tsx';
import CustomersPage from './Admin/pages/custemer.tsx';
// import { Layout } from './components/layout/admin.tsx';



// user pages
import UserLoginPage from './Users/Auth/userLogin.tsx';
import UserRestPage from './Users/Auth/userPassReset.tsx';
import UserRegisterPage from './Users/Auth/userRegister.tsx';
import Home from './Users/pages/Homepage.tsx';
import ProductDetails from './Users/pages/products.tsx';
import { UserLayout } from './components/layout/user.tsx';
import CartPage from './Users/pages/cart.tsx';
import  Checkout  from "./Users/pages/payment.tsx";


// common page

import NotFoundPage from './404.tsx';

// ==========================================
// MAIN APP ROUTER
// ==========================================
export default function App() {
  return (
    <Router>
      <Routes>

        {/* PUBLIC STOREFRONT ROUTES */}
        <Route path="/" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/products" element={<UserLayout><ProductDetails /></UserLayout>} />
        <Route path="/cart" element={<UserLayout><CartPage /></UserLayout>} />
        <Route path="/checkout" element={<UserLayout><Checkout /></UserLayout>} />

        {/* AUTHENTICATION ROUTE */}
        <Route path="/login" element={<UserLoginPage />} />
        <Route path="register" element={<UserRegisterPage />} />
        <Route path="/reset-password" element={<UserRestPage />} />

        {/* PROTECTED ADMIN ROUTES */}
        {/* Note: In a real app, wrap AdminDashboard in a <ProtectedRoute> */}
        <Route path="/admin/login" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/products" element={<ProductsPage />} />
        <Route path="/admin/orders" element={<OrdersPage />} />
        <Route path="/admin/customers" element={<CustomersPage />} />

        {/* 404 CATCH-ALL */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}