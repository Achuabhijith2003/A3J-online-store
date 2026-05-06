import React from 'react';
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



// user pages
import UserLoginPage from './Users/Auth/userLogin.tsx';


// common page

import NotFoundPage from './404.tsx';



// ==========================================
// PLACEHOLDER COMPONENTS (Until you build them)
// ==========================================
const Home = () => (
  <div className="text-center py-24">
    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-black mb-6">
      Welcome to High-Contrast Monochrome
    </h1>
    <p className="text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
      Experience the pinnacle of minimalist design. Our products speak for themselves, framed by a distraction-free environment.
    </p>
    <Link 
      to="/products" 
      className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors rounded-sm inline-block font-medium"
    >
      Shop Now
    </Link>
  </div>
);

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

// const AdminDashboard = () => (
//   <div className="bg-gray-50 -mx-4 -my-16 px-4 py-16 min-h-[calc(100vh-73px)]">
//     <div className="max-w-7xl mx-auto">
//       <h1 className="text-3xl font-bold tracking-tight text-black mb-8">Admin Dashboard</h1>
//       <div className="bg-white border border-gray-200 rounded-sm p-8">
//         <p className="text-gray-600 mb-6">Secure dashboard for managing orders and inventory.</p>
//         <div className="flex gap-4">
//           <span className="px-3 py-1 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium rounded-sm">
//             System Operational
//           </span>
//           <span className="px-3 py-1 bg-amber-50 border border-amber-200 text-amber-700 text-xs font-medium rounded-sm">
//             3 Pending Orders
//           </span>
//         </div>
//       </div>
//     </div>
//   </div>
// );

// We are simulating the LoginPage you just created so the router works
// const LoginPage = () => (
//   <div className="max-w-md mx-auto text-center mt-16 border border-gray-200 p-12 bg-white">
//     <h1 className="text-3xl font-bold tracking-tight text-black mb-4">Login Page</h1>
//     <p className="text-gray-500 mb-8 leading-relaxed">
//       This is where your monochrome login form goes.
//     </p>
//     <Link 
//       to="/admin" 
//       className="bg-black text-white px-6 py-3 hover:bg-gray-800 transition-colors rounded-sm inline-block font-medium w-full"
//     >
//       Simulate Login
//     </Link>
//   </div>
// );

// A simple layout wrapper for a Navigation Bar
const Layout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen flex flex-col font-sans bg-white">
    {/* Sticky Navigation Bar */}
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="flex justify-between items-center max-w-7xl w-full mx-auto px-4 py-4">
        <Link to="/" className="font-bold tracking-tight text-xl text-black">
          A3J
        </Link>
        <div className="space-x-8 text-sm font-medium">
          <Link to="/products" className="text-gray-500 hover:text-black transition-colors">Products</Link>
          <Link to="/cart" className="text-gray-500 hover:text-black transition-colors">Cart</Link>
          <Link to="/login" className="text-gray-500 hover:text-black transition-colors">Login</Link>
        </div>
      </div>
    </nav>
    
    {/* Main Content Area with generous whitespace */}
    <main className="flex-grow max-w-7xl mx-auto w-full px-4 my-16">
      {children}
    </main>
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
        <Route path="/" element={<Layout><Home /></Layout>} />
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