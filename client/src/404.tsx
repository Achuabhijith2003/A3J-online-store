import { ArrowLeft, Home, Search } from 'lucide-react';

// ==========================================
// MOCK DATA (Sourced from Canvas selection)
// ==========================================
const PRODUCTS = [
  { 
    id: 'SKU-001', 
    name: 'Minimalist White Chair', 
    price: '$249.00', 
    stock: 45, 
    status: 'Active', 
    img: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=150&q=80&fit=crop' 
  },
  { 
    id: 'SKU-002', 
    name: 'Black Ceramic Vase', 
    price: '$89.00', 
    stock: 3, 
    status: 'Active', 
    img: 'https://images.unsplash.com/photo-1610715936287-6c2ad208cdbf?w=150&q=80&fit=crop' 
  },
  { 
    id: 'SKU-003', 
    name: 'Monochrome Wool Throw', 
    price: '$120.00', 
    stock: 0, 
    status: 'Draft', 
    img: 'https://images.unsplash.com/photo-1580870059816-5544d6db537d?w=150&q=80&fit=crop' 
  },
  { 
    id: 'SKU-004', 
    name: 'Concrete Table Lamp', 
    price: '$175.00', 
    stock: 12, 
    status: 'Active', 
    img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150&q=80&fit=crop' 
  },
];

export default function NotFoundPage() {
  // Take only the first 4 active items to suggest to the user
  const suggestedProducts = PRODUCTS.filter(p => p.status === 'Active').slice(0, 4);

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col items-center pt-24 pb-16 px-4">
      
      {/* 404 Header Section */}
      <div className="max-w-2xl text-center mb-24">
        <h1 className="text-9xl font-bold tracking-tighter text-black mb-4">404</h1>
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-black mb-6">
          Page not found.
        </h2>
        <p className="text-lg text-gray-500 mb-10 leading-relaxed">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable. 
        </p>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a 
            href="/" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-black text-white px-8 py-3.5 rounded-sm text-sm font-medium uppercase tracking-widest hover:bg-gray-800 transition-colors"
          >
            <Home size={18} />
            Back to Home
          </a>
          <a 
            href="/products" 
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black border border-black px-8 py-3.5 rounded-sm text-sm font-medium uppercase tracking-widest hover:bg-gray-50 transition-colors"
          >
            <Search size={18} />
            Browse Store
          </a>
        </div>
      </div>

      {/* Suggested Products Section */}
      <div className="max-w-7xl w-full border-t border-gray-200 pt-16">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-bold tracking-tight text-black">
            You might be interested in
          </h3>
          <a href="/products" className="text-sm font-medium text-gray-500 hover:text-black flex items-center gap-1 transition-colors group">
            View all products 
            <ArrowLeft className="w-4 h-4 rotate-180 transform group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {suggestedProducts.map((product) => (
            <a key={product.id} href={`/products/${product.id}`} className="group block cursor-pointer overflow-hidden">
              <div className="w-full aspect-[4/5] bg-gray-100 overflow-hidden mb-4 rounded-sm border border-gray-200 relative">
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-700 ease-in-out" 
                />
                {/* Minimalist Add to Cart Overlay */}
                <div className="absolute inset-x-0 bottom-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-black text-white text-center py-3 text-sm font-medium tracking-widest uppercase rounded-sm">
                    View Details
                  </div>
                </div>
              </div>
              <h4 className="text-black font-medium text-base truncate">{product.name}</h4>
              <p className="text-gray-500 font-semibold tracking-wide mt-1">{product.price}</p>
            </a>
          ))}
        </div>
      </div>

    </div>
  );
}