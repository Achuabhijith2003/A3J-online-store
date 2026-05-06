import { 
  ChevronDown
} from 'lucide-react';

export default function Checkout() {
  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      
      {/* ==========================================
          MAIN CHECKOUT SECTION
      ========================================== */}
      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-8 py-12 md:py-20">
        
        <h1 className="text-4xl font-bold tracking-tight mb-12 md:mb-16">
          Checkout
        </h1>

        <div className="flex flex-col lg:flex-row gap-16 xl:gap-28">
          
          {/* ==========================================
              LEFT COLUMN: FORMS
          ========================================== */}
          <div className="flex-1">
            
            {/* Contact Section */}
            <section className="mb-14">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Contact</h2>
              <div className="space-y-4">
                <input 
                  type="email" 
                  placeholder="Email address" 
                  className="w-full border-b border-gray-200 py-3 text-sm bg-transparent outline-none focus:border-black transition-colors placeholder:text-gray-500"
                />
                <div className="flex items-center gap-3 pt-2">
                  <input 
                    type="checkbox" 
                    id="marketing"
                    className="w-4 h-4 border-gray-300 rounded-sm text-black focus:ring-black accent-black cursor-pointer"
                  />
                  <label htmlFor="marketing" className="text-sm text-gray-500 cursor-pointer select-none">
                    Email me with news and offers
                  </label>
                </div>
              </div>
            </section>

            {/* Shipping Details Section */}
            <section className="mb-14">
              <h2 className="text-2xl font-bold tracking-tight mb-6">Shipping details</h2>
              <div className="space-y-0">
                {/* Country */}
                <div className="relative border-b border-gray-200">
                  <select className="w-full py-3 text-sm bg-transparent outline-none focus:border-black transition-colors appearance-none cursor-pointer">
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>

                {/* Name Row */}
                <div className="flex gap-6 border-b border-gray-200">
                  <input 
                    type="text" 
                    placeholder="First name" 
                    className="w-1/2 py-3 text-sm bg-transparent outline-none focus:border-black transition-colors placeholder:text-gray-500"
                  />
                  <input 
                    type="text" 
                    placeholder="Last name" 
                    className="w-1/2 py-3 text-sm bg-transparent outline-none focus:border-black transition-colors placeholder:text-gray-500"
                  />
                </div>

                {/* Address */}
                <div className="border-b border-gray-200">
                  <input 
                    type="text" 
                    placeholder="Address" 
                    className="w-full py-3 text-sm bg-transparent outline-none focus:border-black transition-colors placeholder:text-gray-500"
                  />
                </div>

                {/* Apartment */}
                <div className="border-b border-gray-200">
                  <input 
                    type="text" 
                    placeholder="Apartment, suite, etc. (optional)" 
                    className="w-full py-3 text-sm bg-transparent outline-none focus:border-black transition-colors placeholder:text-gray-500"
                  />
                </div>

                {/* City & ZIP */}
                <div className="flex gap-6 border-b border-gray-200">
                  <input 
                    type="text" 
                    placeholder="City" 
                    className="w-1/2 py-3 text-sm bg-transparent outline-none focus:border-black transition-colors placeholder:text-gray-500"
                  />
                  <input 
                    type="text" 
                    placeholder="ZIP code" 
                    className="w-1/2 py-3 text-sm bg-transparent outline-none focus:border-black transition-colors placeholder:text-gray-500"
                  />
                </div>
              </div>
            </section>

            {/* Payment Section */}
            <section className="mb-10">
              <h2 className="text-2xl font-bold tracking-tight mb-2">Payment</h2>
              <p className="text-sm text-gray-500 mb-6">All transactions are secure and encrypted.</p>
              
              <div className="border border-gray-200 rounded-sm overflow-hidden">
                <input 
                  type="text" 
                  placeholder="Card number" 
                  className="w-full p-4 border-b border-gray-200 text-sm bg-white outline-none focus:bg-gray-50 transition-colors placeholder:text-gray-500"
                />
                <div className="flex border-b border-gray-200">
                  <input 
                    type="text" 
                    placeholder="Expiration date (MM / YY)" 
                    className="w-1/2 p-4 border-r border-gray-200 text-sm bg-white outline-none focus:bg-gray-50 transition-colors placeholder:text-gray-500"
                  />
                  <input 
                    type="text" 
                    placeholder="Security code" 
                    className="w-1/2 p-4 text-sm bg-white outline-none focus:bg-gray-50 transition-colors placeholder:text-gray-500"
                  />
                </div>
                <input 
                  type="text" 
                  placeholder="Name on card" 
                  className="w-full p-4 text-sm bg-white outline-none focus:bg-gray-50 transition-colors placeholder:text-gray-500"
                />
              </div>
            </section>

          </div>


          {/* ==========================================
              RIGHT COLUMN: ORDER SUMMARY
          ========================================== */}
          <div className="w-full lg:w-[400px] xl:w-[480px] flex-shrink-0">
            <div className="sticky top-28">
              <h2 className="text-2xl font-bold tracking-tight mb-8">Order summary</h2>
              
              {/* Items */}
              <div className="space-y-6 mb-8 border-b border-gray-200 pb-8">
                {/* Item 1 */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-24 bg-gray-50 flex-shrink-0 overflow-hidden rounded-sm border border-gray-100">
                    <img 
                      src="https://images.unsplash.com/photo-1610715936287-6c2ad208cdbf?w=400&q=80" 
                      alt="Monochrome Vessel" 
                      className="w-full h-full object-cover grayscale mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-black">Monochrome Vessel</h3>
                    <p className="text-xs text-gray-500 mt-1">Matte Black</p>
                  </div>
                  <div className="text-sm font-semibold">120.00</div>
                </div>

                {/* Item 2 */}
                <div className="flex items-center gap-6">
                  <div className="w-20 h-24 bg-gray-50 flex-shrink-0 overflow-hidden rounded-sm border border-gray-100 relative">
                    <img 
                      src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&q=80" 
                      alt="Precision Chronograph" 
                      className="w-full h-full object-cover grayscale mix-blend-multiply"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-black">Precision Chronograph</h3>
                    <p className="text-xs text-gray-500 mt-1">Silver / Black</p>
                  </div>
                  <div className="text-sm font-semibold">450.00</div>
                </div>
              </div>

              {/* Totals */}
              <div className="space-y-4 text-sm mb-6 border-b border-gray-200 pb-6">
                <div className="flex justify-between items-center text-gray-600">
                  <span>Subtotal</span>
                  <span className="font-medium text-black">570.00</span>
                </div>
                <div className="flex justify-between items-center text-gray-600">
                  <span>Shipping</span>
                  <span className="text-[10px] font-bold tracking-widest uppercase">Calculated</span>
                </div>
              </div>

              {/* Final Total */}
              <div className="flex justify-between items-end mb-8">
                <span className="text-xl font-bold tracking-tight">Total</span>
                <span className="text-xl font-bold tracking-tight">
                  <span className="text-sm text-gray-500 mr-2 font-medium">USD</span>
                  570.00
                </span>
              </div>

              {/* Submit Button */}
              <button className="w-full bg-black text-white py-4 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors">
                Complete Order
              </button>
            </div>
          </div>

        </div>
      </main>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer className="bg-white border-t border-gray-100 py-8 px-4 md:px-8 mt-auto">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-[1400px] mx-auto w-full">
          <div className="text-left">
            <div className="text-lg font-bold tracking-tight text-black mb-1">
              High-Contrast Monochrome
            </div>
            <div className="text-[11px] text-gray-500">
              © {new Date().getFullYear()} High-Contrast Monochrome. All rights reserved.
            </div>
          </div>
          
          <nav className="flex flex-wrap justify-center md:justify-end gap-6 text-xs text-gray-500 font-medium">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-black transition-colors">Shipping</a>
            <a href="#" className="hover:text-black transition-colors">Returns</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </nav>
        </div>
      </footer>

    </div>
  );
}