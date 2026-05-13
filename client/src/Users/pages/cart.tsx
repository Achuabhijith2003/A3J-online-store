import { useState, useEffect } from 'react';
import { 
  ArrowLeft,
  Minus,
  Plus,
  CreditCard,
  Banknote,
  Lock,
  Loader2
} from 'lucide-react';

interface CartItem {
  id: string; // The cart item ID
  productId: string; // The actual product ID
  name: string;
  price: number;
  quantity: number;
  image: string;
  color?: string; // Optional since the backend might not store this yet
  size?: string;  // Optional since the backend might not store this yet
}

interface RawCartItem {
  id: string;
  product_id: string;
  quantity: number;
  products?: {
    name: string;
    price: number;
    main_image_url?: string;
  };
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // 1. Fetch Cart Data
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setIsLoading(false);
        return; // User is not logged in, leave cart empty
      }

      try {
        const response = await fetch('/api/cart', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Failed to fetch cart');

        const data = await response.json();
        
        // Map the backend response to match our frontend UI structure
        const mappedItems = data.cartItems.map((item: RawCartItem) => ({
          id: item.id,
          productId: item.product_id,
          name: item.products?.name || 'Unknown Product',
          price: Number(item.products?.price || 0),
          quantity: item.quantity,
          image: item.products?.main_image_url || 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80',
          color: 'Standard', // Placeholder - implement in DB later if needed
          size: 'Standard'   // Placeholder - implement in DB later if needed
        }));

        setCartItems(mappedItems);
      } catch (err: unknown) {
        console.error("Error fetching cart:", err);
        setError("Could not load your cart. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCart();
  }, []);

  // 2. Update Quantity (Calls the PUT API)
  const updateQuantity = async (productId: string, currentQuantity: number, delta: number) => {
    const newQuantity = Math.max(1, currentQuantity + delta);
    const token = localStorage.getItem('token');

    // Optimistic UI Update: Instantly update the screen so it feels fast
    setCartItems(items => 
      items.map(item => 
        item.productId === productId ? { ...item, quantity: newQuantity } : item
      )
    );

    if (!token) return;

    try {
      await fetch('/api/cart/update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ productId, quantity: newQuantity })
      });
    } catch (err) {
      console.error("Failed to update cart quantity on server", err);
      // Ideally, you would revert the optimistic update here if the API fails
    }
  };

  // 3. Remove Item (Calls the DELETE API)
  const removeItem = async (productId: string) => {
    const token = localStorage.getItem('token');

    // Optimistic UI Update
    setCartItems(items => items.filter(item => item.productId !== productId));

    if (!token) return;

    try {
      await fetch(`/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
    } catch (err) {
      console.error("Failed to remove item on server", err);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
 
  const formattedSubtotal = `$${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      
     

      {/* ==========================================
          MAIN CONTENT
      ========================================== */}
      <main className="flex-grow px-6 lg:px-12 py-12 max-w-[1600px] w-full mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-12">Your Bag</h1>

        <div className="flex flex-col lg:flex-row gap-12 xl:gap-24">
          
          {/* Left Column: Cart Items */}
          <div className="flex-1">
            
            {/* Loading State */}
            {isLoading ? (
              <div className="py-24 flex flex-col items-center justify-center text-gray-500 border-t border-gray-200">
                <Loader2 className="w-8 h-8 animate-spin mb-4 text-black" />
                <p className="text-sm font-medium uppercase tracking-widest">Loading Bag...</p>
              </div>
            ) : error ? (
              <div className="py-12 border-t border-gray-200 text-center text-red-600">
                <p className="mb-6">{error}</p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-12 border-t border-gray-200 text-center">
                <p className="text-gray-500 mb-6">Your bag is currently empty.</p>
                <a href="/shop" className="inline-block bg-black text-white px-8 py-3 text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-gray-800 transition-colors">
                  Continue Shopping
                </a>
              </div>
            ) : (
              <>
                <div className="border-t border-gray-200">
                  {cartItems.map((item) => (
                    <div key={item.id} className="py-8 border-b border-gray-200 flex gap-6 md:gap-8">
                      {/* Product Image */}
                      <div className="w-32 md:w-48 aspect-square md:aspect-[4/5] bg-gray-100 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="w-full h-full object-cover mix-blend-multiply"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 flex flex-col justify-between">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="text-lg md:text-xl font-bold tracking-tight mb-2">{item.name}</h3>
                            <p className="text-sm text-gray-500 mb-1">Color: {item.color}</p>
                            <p className="text-sm text-gray-500">Size: {item.size}</p>
                          </div>
                          <span className="text-sm font-bold tracking-wide">
                            ${item.price.toFixed(2)}
                          </span>
                        </div>

                        <div className="flex justify-between items-end mt-6">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-gray-300 rounded-sm">
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity, -1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                            >
                              <Minus size={14} />
                            </button>
                            <span className="w-8 h-8 flex items-center justify-center text-sm font-medium border-x border-gray-300">
                              {item.quantity}
                            </span>
                            <button 
                              onClick={() => updateQuantity(item.productId, item.quantity, 1)}
                              className="w-8 h-8 flex items-center justify-center text-gray-500 hover:text-black hover:bg-gray-50 transition-colors"
                            >
                              <Plus size={14} />
                            </button>
                          </div>

                          {/* Remove Button */}
                          <button 
                            onClick={() => removeItem(item.productId)}
                            className="text-[10px] font-bold tracking-widest uppercase text-gray-500 hover:text-black transition-colors"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Continue Shopping Link */}
                <div className="mt-12">
                  <a href="/shop" className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-gray-900 hover:text-gray-500 transition-colors">
                    <ArrowLeft size={16} />
                    Continue Shopping
                  </a>
                </div>
              </>
            )}
          </div>

          {/* Right Column: Order Summary */}
          {cartItems.length > 0 && (
            <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0">
              <div className="bg-gray-50 p-8 border border-gray-100 sticky top-28">
                <h2 className="text-2xl font-bold tracking-tight mb-8">Order Summary</h2>
                
                <div className="space-y-4 mb-6 text-sm text-gray-600">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span className="font-medium text-black">{formattedSubtotal}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Shipping</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">Calculated at next step</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Estimated Tax</span>
                    <span className="font-medium text-black">$0.00</span>
                  </div>
                </div>

                <div className="border-t border-gray-200 py-6 mb-2">
                  <div className="flex justify-between items-center">
                    <span className="text-2xl font-bold tracking-tight">Total</span>
                    <span className="text-2xl font-bold tracking-tight">{formattedSubtotal}</span>
                  </div>
                </div>

                {/* Promo Code Input */}
                <div className="mb-8">
                  <label className="block text-[10px] font-bold tracking-widest uppercase text-gray-500 mb-2">
                    Promo Code
                  </label>
                  <div className="flex border-b border-gray-300">
                    <input 
                      type="text" 
                      placeholder="Enter code" 
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                      className="flex-1 bg-transparent py-2 outline-none text-sm placeholder:text-gray-400"
                    />
                    <button className="text-xs font-bold tracking-widest uppercase text-black hover:text-gray-600 transition-colors px-2">
                      Apply
                    </button>
                  </div>
                </div>

                <a href="/checkout" className="block w-full bg-black text-white text-center py-4 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 transition-colors mb-6">
                  Proceed to Checkout
                </a>

                <p className="text-center text-xs text-gray-500 mb-6 px-4">
                  Taxes and shipping are calculated at checkout.
                </p>

                {/* Trust Badges / Icons */}
                <div className="flex justify-center items-center gap-4 text-gray-400">
                  <CreditCard size={24} strokeWidth={1.5} />
                  <Banknote size={24} strokeWidth={1.5} />
                  <Lock size={24} strokeWidth={1.5} />
                </div>
              </div>
            </div>
          )}

        </div>
      </main>

      {/* ==========================================
          FOOTER
      ========================================== */}
      <footer className="border-t border-gray-200 px-6 lg:px-12 py-10 mt-auto bg-white">
        <div className="max-w-[1600px] mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-xl font-bold tracking-tight text-black">
            High-Contrast Monochrome
          </div>
          
          <nav className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 font-medium">
            <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-black transition-colors">Shipping</a>
            <a href="#" className="hover:text-black transition-colors">Returns</a>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
          </nav>
          
          <div className="text-[10px] text-gray-400 font-medium uppercase tracking-widest">
            © {new Date().getFullYear()} High-Contrast Monochrome. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}