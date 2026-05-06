import { useState } from 'react';
import {Heart, ChevronDown, ChevronUp } from 'lucide-react';

export default function ProductDetails() {
  const [selectedSize, setSelectedSize] = useState('S');
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">  
      {/* ==========================================
          MAIN PRODUCT SECTION
      ========================================== */}
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Column: Product Image */}
        <div className="bg-gray-50 flex flex-col items-center justify-center p-8 md:p-16 relative">
          <div className="w-full max-w-xl aspect-[3/4] relative bg-white border border-gray-100 shadow-sm flex items-center justify-center p-8">
            <img 
              src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80" 
              alt="The Structured Tee" 
              className="w-full h-full object-contain grayscale mix-blend-multiply"
            />
          </div>
          
          {/* Carousel Indicators */}
          <div className="absolute bottom-8 flex items-center gap-2">
            <div className="w-2 h-2 bg-black rounded-sm"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
            <div className="w-2 h-2 bg-gray-300 rounded-sm"></div>
          </div>
        </div>

        {/* Right Column: Product Details */}
        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <div className="max-w-lg w-full mx-auto lg:mx-0">
            
            {/* Breadcrumbs */}
            <nav className="text-xs font-medium text-gray-500 tracking-wide mb-8">
              <a href="#" className="hover:text-black transition-colors">Shop</a>
              <span className="mx-2">/</span>
              <a href="#" className="hover:text-black transition-colors">Essentials</a>
              <span className="mx-2">/</span>
              <span className="text-black">The Structured Tee</span>
            </nav>

            {/* Title & Price */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight uppercase mb-4">
              The Structured Tee
            </h1>
            <p className="text-sm font-bold tracking-widest uppercase mb-8">
              $85.00 USD
            </p>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-10 text-sm md:text-base">
              Engineered for precise draping and enduring shape. Cut from heavy-weight, densely woven organic cotton. A study in reductive design, eliminating all unnecessary seams for a cleaner silhouette.
            </p>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold tracking-widest uppercase">Size</span>
                <a href="#" className="text-xs font-medium text-gray-500 underline hover:text-black transition-colors">
                  Size Guide
                </a>
              </div>
              <div className="grid grid-cols-5 border border-gray-200 rounded-sm overflow-hidden">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-xs font-semibold tracking-widest transition-colors ${
                      selectedSize === size 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black hover:bg-gray-50 border-r border-gray-200 last:border-r-0'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 mb-16">
              <button className="w-full bg-black text-white py-4 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
              <button className="w-full bg-white text-black border border-gray-200 py-4 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-gray-50 transition-colors flex items-center justify-center gap-2">
                <Heart size={16} strokeWidth={2} />
                Save for Later
              </button>
            </div>

            {/* Accordions */}
            <div className="border-t border-gray-200">
              {/* Details & Care */}
              <div className="border-b border-gray-200">
                <button 
                  onClick={() => toggleAccordion('details')}
                  className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
                >
                  <span className="text-xs font-bold tracking-widest uppercase group-hover:text-gray-600 transition-colors">
                    Details & Care
                  </span>
                  {openAccordion === 'details' ? (
                    <ChevronUp size={16} className="text-gray-400 group-hover:text-black transition-colors" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400 group-hover:text-black transition-colors" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordion === 'details' ? 'max-h-48 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <ul className="space-y-2 text-sm text-gray-600 list-disc pl-4">
                    <li>100% Heavyweight Organic Cotton</li>
                    <li>240 GSM weight</li>
                    <li>Preshrunk to minimize shrinkage</li>
                    <li>Machine wash cold, line dry</li>
                    <li>Made in Portugal</li>
                  </ul>
                </div>
              </div>

              {/* Shipping & Returns */}
              <div className="border-b border-gray-200">
                <button 
                  onClick={() => toggleAccordion('shipping')}
                  className="w-full flex items-center justify-between py-5 text-left focus:outline-none group"
                >
                  <span className="text-xs font-bold tracking-widest uppercase group-hover:text-gray-600 transition-colors">
                    Shipping & Returns
                  </span>
                  {openAccordion === 'shipping' ? (
                    <ChevronUp size={16} className="text-gray-400 group-hover:text-black transition-colors" />
                  ) : (
                    <ChevronDown size={16} className="text-gray-400 group-hover:text-black transition-colors" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    openAccordion === 'shipping' ? 'max-h-48 opacity-100 pb-5' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-sm text-gray-600">
                    Complimentary standard shipping on all orders. Returns are accepted within 30 days of delivery for unworn items in their original condition.
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>

      {/* ==========================================
          FOOTER (Minimal version)
      ========================================== */}
      <footer className="bg-white border-t border-gray-100 py-8 px-4 md:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-lg font-bold tracking-tight text-black">
            High-Contrast Monochrome
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 font-medium">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-black transition-colors">Shipping</a>
            <a href="#" className="hover:text-black transition-colors">Returns</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </nav>
          
          <div className="text-xs text-gray-400">
            © {new Date().getFullYear()} High-Contrast Monochrome. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}