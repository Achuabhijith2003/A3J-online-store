import { BrowserRouter as Router, Routes, Route, Link, } from 'react-router-dom';
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
import {Layout} from './components/layout/admin.tsx';
import {UserLayout} from './components/layout/user.tsx';





// user pages
import UserLoginPage from './Users/Auth/userLogin.tsx';
import Home from './Users/pages/Homepage.tsx';



// common page

import NotFoundPage from './404.tsx';



// ==========================================
// PLACEHOLDER COMPONENTS (Until you build them)
// ==========================================

const ProductList = () => (
  <div>
    <h1 className="text-3xl font-bold tracking-tight text-black mb-8">All Products</h1>
    {/* Mocking a grid based on design.md spacing and card guidelines */}
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {[1, 2, 3, 4].map((item) => (
        <div key={item} className="group cursor-pointer overflow-hidden">
          <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden mb-4 transition duration-500 group-hover:scale-105 flex items-center justify-center">
             <span className="text-gray-400 text-sm">Product Image {item}</span>
          </div>
          <h3 className="text-black font-medium truncate">Monochrome Essential {item}</h3>
          <p className="text-black font-semibold tracking-wide mt-1">$199.00</p>
        </div>
      ))}
    </div>
  </div>
);

const Cart = () => (
  <div className="max-w-3xl mx-auto">
    <h1 className="text-3xl font-bold tracking-tight text-black mb-8">Your Shopping Cart</h1>
    <div className="border border-gray-200 rounded-sm p-16 text-center">
      <p className="text-gray-500 mb-6">Your cart is currently empty.</p>
      <Link 
        to="/products" 
        className="bg-white text-black border border-black px-6 py-3 hover:bg-gray-50 transition-colors rounded-sm inline-block font-medium"
      >
        Continue Shopping
      </Link>
    </div>
  </div>
);

// ==========================================
// MAIN APP ROUTER
// ==========================================
export default function App() {
  return (
    <Router>
      <Routes>
        
        {/* PUBLIC STOREFRONT ROUTES */}
        <Route path="/" element={<UserLayout><Home /></UserLayout>} />
        <Route path="/products" element={<Layout><ProductList /></Layout>} />
        <Route path="/cart" element={<Layout><Cart /></Layout>} />
        
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