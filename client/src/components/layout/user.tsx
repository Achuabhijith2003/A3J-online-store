import { useState, useEffect, useRef } from 'react';
import { Search, ShoppingBag, User, Menu, LogOut } from 'lucide-react';
    
export const UserLayout = ({ children }: { children: React.ReactNode }) => {
  // Use lazy initialization for state to avoid the effect entirely for this purpose
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return !!localStorage.getItem('token');
  });
  
  // State for managing the dropdown menu visibility
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // State for cart total items
  const [totalItems, setTotalItems] = useState(0);

  // Fetch cart count on load or when auth state changes
  useEffect(() => {
    const fetchCartItemCount = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        const response = await fetch('/api/cart', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          // Calculate the total quantity across all distinct products
          const count = data.cartItems.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
          setTotalItems(count);
        }
      } catch (error) {
        console.error("Failed to fetch cart item count", error);
      }
    };

    if (isLoggedIn) {
      fetchCartItemCount();
    }
  }, [isLoggedIn]);

  // Close the dropdown when clicking anywhere outside of it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle manual login/logout toggle for development
  const handleAuthToggle = () => {
    if (isLoggedIn) {
      // Clear token on logout
      localStorage.removeItem('token');
      setIsLoggedIn(false);
      setIsDropdownOpen(false);
    } else {
      // Mock login for dev purposes
      setIsLoggedIn(true);
    }
  };

  // Dedicated logout function for the dropdown button
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    
    // Note: If you want this to instantly kick them back to the login page, 
    // uncomment the line below (or use navigate('/login') if using react-router):
    // window.location.href = '/login';
  };

  return (
    <div className="flex flex-col font-sans bg-white min-h-screen">
      
      {/* Dev Tool - Can be removed in production */}
      <div className="fixed bottom-4 right-4 z-50 bg-white border border-gray-200 p-3 shadow-lg rounded-sm text-xs flex items-center gap-3">
        <span className="font-medium">Dev Auth State:</span>
        <button 
          onClick={handleAuthToggle}
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
            {/* Added relative positioning to keep the badge pinned to the icon */}
            <a href="/cart" className="text-black hover:text-gray-600 transition-colors relative" >
              <ShoppingBag size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-black text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </a>
            
            {/* Conditional Auth Rendering */}
            {isLoggedIn ? (
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="text-black hover:text-gray-600 transition-colors flex items-center"
                >
                  <User size={20} strokeWidth={1.5} />
                </button>

                {/* Profile Dropdown Menu */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-4 w-48 bg-white border border-gray-200 rounded-sm shadow-lg py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100 mb-1">
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">My Account</p>
                    </div>
                    <a href="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                      Profile
                    </a>
                    <a href="/orders" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-black transition-colors">
                      Order History
                    </a>
                    <div className="border-t border-gray-100 mt-2 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <LogOut size={16} strokeWidth={2} />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <a href="/login" className="text-xs font-medium uppercase tracking-wide hover:text-gray-600 transition-colors px-2">
                  Login
                </a>
                <a href="/register" className="bg-black text-white px-4 py-2 text-xs font-medium uppercase tracking-wide rounded-sm hover:bg-gray-800 transition-colors inline-block">
                  Sign Up
                </a>
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
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
};