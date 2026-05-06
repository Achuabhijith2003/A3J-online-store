import { useState } from 'react';
import { 
  ArrowLeft,
  Minus,
  Plus,
  CreditCard,
  Banknote,
  Lock
} from 'lucide-react';

// ==========================================
// MOCK DATA
// ==========================================
const INITIAL_CART_ITEMS = [
  {
    id: '1',
    name: 'Tailored Wool Coat',
    color: 'Midnight Black',
    size: 'L',
    price: 1250.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&q=80'
  },
  {
    id: '2',
    name: 'Organic Cotton Tee',
    color: 'Optic White',
    size: 'M',
    price: 85.00,
    quantity: 1,
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80'
  }
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState(INITIAL_CART_ITEMS);
  const [promoCode, setPromoCode] = useState('');

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(items => 
      items.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const formattedSubtotal = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      
  

      {/* ==========================================
          MAIN CART SECTION
      ========================================== */}
      <main className="flex-grow max-w-[1400px] mx-auto w-full px-4 md:px-8 py-12 md:py-20">
        
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">
          Your Bag
        </h1>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          
          {/* Left Column: Cart Items */}
          <div className="flex-1">
            {cartItems.length === 0 ? (
              <div className="py-12 border-t border-b border-gray-100 text-center">
                <p className="text-gray-500 mb-6">Your bag is currently empty.</p>
                <a href="/products" className="inline-block bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-gray-800 transition-colors">
                  Continue Shopping
                </a>
              </div>
            ) : (
              <div className="flex flex-col">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex gap-6 py-8 border-b border-gray-100 first:border-t">
                    {/* Product Image */}
                    <div className="w-32 md:w-48 aspect-[4/5] bg-gray-50 flex-shrink-0 relative overflow-hidden rounded-sm">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover grayscale mix-blend-multiply"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between py-1">
                      <div>
                        <div className="flex justify-between items-start gap-4">
                          <h3 className="text-lg md:text-xl font-bold tracking-tight">{item.name}</h3>
                          <span className="text-sm md:text-base font-bold tracking-wide text-right">
                            ${item.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                          </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-500 space-y-1">
                          <p>Color: {item.color}</p>
                          <p>Size: {item.size}</p>
                        </div>
                      </div>

                      <div className="flex items-end justify-between mt-6">
                        {/* Quantity Selector */}
                        <div className="flex items-center border border-gray-300 rounded-sm">
                          <button 
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                          >
                            <Minus size={14} />
                          </button>
                          <div className="w-10 h-10 flex items-center justify-center text-sm font-medium border-l border-r border-gray-300">
                            {item.quantity}
                          </div>
                          <button 
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black transition-colors"
                          >
                            <Plus size={14} />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-xs font-medium tracking-widest uppercase text-gray-500 hover:text-black transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}

                <div className="pt-12">
                  <a href="/products" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-600 hover:text-black transition-colors group">
                    <ArrowLeft size={16} className="transform group-hover:-translate-x-1 transition-transform" />
                    Continue Shopping
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Order Summary */}
          {cartItems.length > 0 && (
            <div className="w-full lg:w-[420px] flex-shrink-0">
              <div className="bg-gray-50/50 border border-gray-200 p-8 rounded-sm sticky top-28">
                <h2 className="text-2xl font-bold tracking-tight mb-8">Order Summary</h2>
                
                <div className="space-y-4 text-sm text-gray-600 mb-8">
                  <div className="flex justify-between items-center">
                    <span>Subtotal</span>
                    <span className="font-medium text-black">{formattedSubtotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping</span>
                    <span className="text-[10px] font-bold tracking-widest uppercase">Calculated at next step</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Estimated Tax</span>
                    <span className="font-medium text-black">$0.00</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6 mb-8 flex justify-between items-end">
                  <span className="text-2xl font-bold tracking-tight">Total</span>
                  <span className="text-3xl font-bold tracking-tight">{formattedSubtotal}</span>
                </div>

                {/* Promo Code */}
                <div className="mb-10">
                  <label className="block text-[11px] font-bold tracking-widest uppercase mb-3">
                    Promo Code
                  </label>
                  <div className="flex items-center border-b border-gray-300 focus-within:border-black transition-colors">
                    <input 
                      type="text" 
                      placeholder="Enter code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="w-full py-2 bg-transparent outline-none text-sm placeholder:text-gray-400"
                    />
                    <button className="text-sm font-medium tracking-wide hover:text-gray-500 transition-colors ml-4">
                      Apply
                    </button>
                  </div>
                </div>

                {/* Checkout Button */}
                <button className="w-full bg-black text-white py-4 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors mb-6">
                  Proceed to Checkout
                </button>

                <p className="text-sm text-gray-500 text-center mb-8 leading-relaxed">
                  Taxes and shipping are calculated at checkout.
                </p>

                {/* Trust Badges */}
                <div className="flex justify-center items-center gap-6 text-gray-400">
                  <CreditCard strokeWidth={1.5} size={28} />
                  <Banknote strokeWidth={1.5} size={28} />
                  <Lock strokeWidth={1.5} size={28} />
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ==========================================
          FOOTER (Minimal version)
      ========================================== */}
      <footer className="bg-white border-t border-gray-100 py-8 px-4 md:px-8 mt-auto">
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