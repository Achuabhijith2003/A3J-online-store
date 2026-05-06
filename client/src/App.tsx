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
import { Layout } from './components/layout/admin.tsx';



// user pages
import UserLoginPage from './Users/Auth/userLogin.tsx';
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
        <Route path="/login" element={<Layout><UserLoginPage /></Layout>} />

        {/* PROTECTED ADMIN ROUTES */}
        {/* Note: In a real app, wrap AdminDashboard in a <ProtectedRoute> */}
        <Route path="/admin/login" element={<Layout><LoginPage /></Layout>} />
        <Route path="/admin/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/admin/products" element={<Layout><ProductsPage /></Layout>} />
        <Route path="/admin/orders" element={<Layout><OrdersPage /></Layout>} />
        <Route path="/admin/customers" element={<Layout><CustomersPage /></Layout>} />

        {/* 404 CATCH-ALL */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>
    </Router>
  );
}