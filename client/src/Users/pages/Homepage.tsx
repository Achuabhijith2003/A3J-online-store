// import  { useState } from 'react';
import {  ArrowRight } from 'lucide-react';

export default function Home() {
  // Mock authentication state to demonstrate the two header types
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div className="min-h-screen bg-white text-black font-sans">
      {/* ==========================================
          HERO SECTION
      ========================================== */}
      <section className="relative w-full h-[70vh] md:h-[80vh] bg-black overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=2500&auto=format&fit=crop" 
          alt="The Onyx Messenger" 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 lg:px-24">
          <div className="max-w-xl">
            <p className="text-white/80 text-xs md:text-sm font-semibold tracking-[0.2em] uppercase mb-4">
              The Core Collection
            </p>
            <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight mb-6 leading-tight">
              The Onyx <br /> Messenger
            </h1>
            <p className="text-white/90 text-base md:text-lg mb-10 max-w-md leading-relaxed">
              Refined utility meeting architectural precision. Crafted from full-grain pebble leather.
            </p>
            <button className="bg-white text-black px-8 py-4 text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-gray-200 transition-colors">
              Shop Now
            </button>
          </div>
        </div>
      </section>

      <main className="max-w-[1600px] mx-auto px-4 md:px-8">
        
        {/* ==========================================
            SHOP BY CATEGORY
        ========================================== */}
        <section className="py-20 md:py-28 border-b border-gray-100">
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-12">Shop by Category</h2>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { name: 'Tops', img: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&q=80' },
              { name: 'Bottoms', img: 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=600&q=80' },
              { name: 'Accessories', img: 'https://images.unsplash.com/photo-1509319117193-57bab727e09d?w=600&q=80' },
              { name: 'Footwear', img: 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=600&q=80' }
            ].map((category, idx) => (
              <a key={idx} href="#" className="group block cursor-pointer">
                <div className="aspect-square bg-gray-100 overflow-hidden rounded-sm mb-4">
                  <img 
                    src={category.img} 
                    alt={category.name} 
                    className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <h3 className="text-xs font-semibold tracking-widest uppercase text-gray-500 group-hover:text-black transition-colors">
                  {category.name}
                </h3>
              </a>
            ))}
          </div>
        </section>

        {/* ==========================================
            NEW ARRIVALS
        ========================================== */}
        <section className="py-20 md:py-28 border-b border-gray-100">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold tracking-tight uppercase">New Arrivals</h2>
              <p className="text-xs text-gray-500 tracking-widest uppercase mt-2">Latest Drop: 001</p>
            </div>
            <a href="#" className="text-xs font-semibold tracking-widest uppercase hover:text-gray-500 transition-colors flex items-center gap-2">
              View All <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Digitalist Cotton Tee', price: '$85.00', img: 'https://images.unsplash.com/photo-1550614000-4b95d4edc617?w=600&q=80' },
              { name: 'Monolith Series II Watch', price: '$450.00', img: 'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&q=80' },
              { name: 'Structure Pleated Trousers', price: '$165.00', img: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=600&q=80' },
              { name: 'Void Technical Sneaker', price: '$260.00', img: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=600&q=80' }
            ].map((product, idx) => (
              <a key={idx} href="#" className="group block cursor-pointer">
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm mb-4 relative">
                  <img 
                    src={product.img} 
                    alt={product.name} 
                    className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-300"></div>
                </div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-black truncate mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-600 font-medium">{product.price}</p>
              </a>
            ))}
          </div>
        </section>

        {/* ==========================================
            CURATION
        ========================================== */}
        <section className="py-20 md:py-28">
          <div className="flex justify-between items-end mb-12">
            <h2 className="text-2xl md:text-3xl font-bold tracking-tight">Curation</h2>
            <a href="#" className="text-xs font-semibold tracking-widest uppercase hover:text-gray-500 transition-colors flex items-center gap-2">
              Discover <ArrowRight size={14} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8">
            <div className="aspect-[4/5] md:aspect-square bg-gray-100 overflow-hidden rounded-sm group cursor-pointer relative">
              <img 
                src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?w=1000&q=80" 
                alt="Curated Bag" 
                className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="aspect-[4/5] md:aspect-square bg-gray-100 overflow-hidden rounded-sm group cursor-pointer relative">
              <img 
                src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1000&q=80" 
                alt="Abstract Shadows" 
                className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform duration-700"
              />
            </div>
          </div>
        </section>

      </main>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer className="bg-white border-t border-gray-200 pt-20 pb-10 px-4 md:px-8">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          
          <div className="lg:col-span-6">
            <h3 className="text-xl font-bold tracking-tight text-black mb-4">
              High-Contrast Monochrome
            </h3>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              A commitment to minimalist luxury, architectural forms, and the purity of black and white.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-widest uppercase text-black mb-6">Shop</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">All Products</a></li>
              <li><a href="#" className="hover:text-black transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Featured</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-widest uppercase text-black mb-6">Company</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">About</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Journal</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Sustainability</a></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className="text-xs font-bold tracking-widest uppercase text-black mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-black transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Shipping</a></li>
              <li><a href="#" className="hover:text-black transition-colors">Returns</a></li>
            </ul>
          </div>
        </div>

        <div className="max-w-[1600px] mx-auto border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-400">
          <p>© {new Date().getFullYear()} High-Contrast Monochrome. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          </div>
        </div>
      </footer>

    </div>
  );
}