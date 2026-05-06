// import { BrowserRouter as Router, Routes, Route, Link, } from 'react-router-dom';
import  { useState } from 'react';
import { Search, ShoppingBag, User, Menu } from 'lucide-react';
    

export const Layout = ({ children }: { children: React.ReactNode }) => {
  // Mock authentication state to demonstrate the two header types
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    
  return (
    <div className="flex flex-col font-sans bg-white">
      <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-200 p-3 shadow-lg rounded-sm text-xs flex items-center gap-3">
        <span className="font-medium">Dev Auth State:</span>
        <button 
          onClick={() => setIsLoggedIn(!isLoggedIn)}
          className="bg-black text-white px-3 py-1.5 rounded-sm hover:bg-gray-800 transition"
        >
          {isLoggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>

     {/* ==========================================
          HEADER
      ========================================== */}
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 h-20 px-4 md:px-8 flex items-center justify-between">
        
        {/* Left: Brand */}
        <div className="flex-1 flex items-center">
          <a href="/" className="text-xl md:text-2xl font-bold tracking-tight text-black">
            A3J
          </a>
        </div>

        {/* Center: Search Bar (Hidden on mobile) */}
        <div className="hidden md:flex flex-1 justify-center">
          <div className="relative w-full max-w-md">
            <input 
              type="text" 
              placeholder="SEARCH OUR COLLECTION..." 
              className="w-full bg-gray-50 border-none rounded-sm py-2.5 pl-4 pr-10 text-xs font-medium tracking-widest uppercase outline-none focus:ring-1 focus:ring-black transition-all placeholder:text-gray-400"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
          </div>
        </div>

        {/* Right: Navigation & Auth */}
        <div className="flex-1 flex justify-end items-center gap-6">
          <nav className="hidden lg:flex items-center gap-6 text-xs font-medium tracking-wide uppercase text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Shop</a>
            <a href="#" className="hover:text-black transition-colors">Collections</a>
            <a href="#" className="hover:text-black transition-colors">About</a>
          </nav>

          <div className="flex items-center gap-4 border-l border-gray-200 pl-6 ml-2">
            <button className="text-black hover:text-gray-600 transition-colors">
              <ShoppingBag size={20} strokeWidth={1.5} />
            </button>
            
            {/* Conditional Auth Rendering */}
            {isLoggedIn ? (
              <button className="text-black hover:text-gray-600 transition-colors">
                <User size={20} strokeWidth={1.5} />
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <button className="text-xs font-medium uppercase tracking-wide hover:text-gray-600 transition-colors">
                  Login
                </button>
                <button className="bg-black text-white px-4 py-2 text-xs font-medium uppercase tracking-wide rounded-sm hover:bg-gray-800 transition-colors">
                  Sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Toggle */}
            <button className="lg:hidden text-black">
              <Menu size={24} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </header>
    
    {/* Main Content Area with generous whitespace */}
    <main >
      {children}
    </main>
  </div>
  );
};