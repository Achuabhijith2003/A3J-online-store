import React, { useState, useEffect } from 'react';
import { 
  Heart, 
  ChevronDown, 
  ChevronUp, 
  ChevronLeft, 
  ChevronRight,
  Loader2
} from 'lucide-react';
import { useParams } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  max_selling_price?: number;
  retail_price?: number;
  description?: string;
  category?: string;
  stock: number;
  main_image_url?: string;
  sub_images_urls?: string[];
  tags?: string[];
}

export default function ProductDetails() {
  // Using React Router to get the product ID from the URL (e.g., /product/123)
  const params = useParams();
  const productId = params.id; 

  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Carousel State
  const [images, setImages] = useState<string[]>([]);
  const [activeImage, setActiveImage] = useState(0);
  
  // Mobile Swiping State
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  // UI Selections
  const [selectedSize, setSelectedSize] = useState('S');
  const [openAccordion, setOpenAccordion] = useState<string | null>('details');

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  // Fetch single product from API
  useEffect(() => {
    const fetchProduct = async () => {
      // If no ID is found in URL, we can optionally prevent fetching or use a fallback
      if (!productId) {
        setError("No product ID provided in the URL.");
        setIsLoading(false);
        return;
      }

      try {
        const response = await fetch(`/api/products/${productId}`);
        if (!response.ok) throw new Error('Failed to fetch product details');
        
        const data = await response.json();
        
        // FIX: Extract the product safely, handling both "product" object or "products" array
        const p = data.product || (data.products && data.products[0]);
        
        if (!p) {
          throw new Error("Product data could not be found in the response.");
        }
        
        setProduct(p);
        
        // Combine main image and sub images into one array for the carousel
        const combinedImages = [p.main_image_url, ...(p.sub_images_urls || [])].filter(Boolean);
        
        // Add a fallback image if the database has absolutely no images
        if (combinedImages.length === 0) {
          combinedImages.push('https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&q=80');
        }
        
        setImages(combinedImages);

      } catch (err: unknown) {
        console.error("Error fetching product:", err);
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  // Image Navigation Functions
  const nextImage = () => setActiveImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setActiveImage((prev) => (prev - 1 + images.length) % images.length);

  // Touch Swipe Handlers for Mobile
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setTouchEnd(e.targetTouches[0].clientX); // Reset touch end
  };
  
  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextImage(); // Swipe Left
    }
    if (touchStart - touchEnd < -75) {
      prevImage(); // Swipe Right
    }
  };

  const toggleAccordion = (section: string) => {
    setOpenAccordion(openAccordion === section ? null : section);
  };

  // Render Loading State
  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-gray-500">
        <Loader2 className="w-10 h-10 animate-spin mb-4 text-black" />
        <p className="text-sm font-medium tracking-widest uppercase">Loading Product...</p>
      </div>
    );
  }

  // Render Error State
  if (error || !product) {
    return (
      <div className="min-h-screen bg-white flex flex-col items-center justify-center text-red-600">
        <p className="text-sm font-medium tracking-widest uppercase">Error: {error || "Product not found"}</p>
        <a href="/" className="mt-6 text-black underline text-sm font-medium">Return to Home</a>
      </div>
    );
  }

  // Pricing Calculations
  const price = Number(product.price || 0);
  const mrp = Number(product.max_selling_price || product.retail_price || 0);
  const hasDiscount = mrp > price;
  const discountPercent = hasDiscount ? Math.round(((mrp - price) / mrp) * 100) : 0;

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col overflow-x-hidden">

      {/* ==========================================
          MAIN PRODUCT SECTION
      ========================================== */}
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-2">
        
        {/* Left Column: Product Image Carousel */}
        <div className="bg-gray-50 flex flex-col items-center justify-center p-0 md:p-8 lg:p-16 relative">
          
          <div className="w-full h-full min-h-[50vh] md:min-h-[600px] relative bg-white md:border md:border-gray-100 shadow-sm flex items-center justify-center overflow-hidden group">
            
            {/* The Image (With Swipe Handlers) */}
            <img 
              src={images[activeImage]} 
              alt={`${product.name} - View ${activeImage + 1}`} 
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              className="w-full h-full object-contain grayscale mix-blend-multiply transition-opacity duration-300 ease-in-out cursor-grab active:cursor-grabbing"
            />

            {/* Desktop Navigation Arrows (Hidden on mobile) */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={prevImage}
                  className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md items-center justify-center rounded-full shadow-sm text-black hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronLeft size={24} />
                </button>
                <button 
                  onClick={nextImage}
                  className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-md items-center justify-center rounded-full shadow-sm text-black hover:bg-black hover:text-white transition-all opacity-0 group-hover:opacity-100"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </div>
          
          {/* Carousel Dot Indicators */}
          {images.length > 1 && (
            <div className="absolute bottom-6 md:bottom-12 flex items-center gap-3">
              {images.map((_, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImage(idx)}
                  className={`w-2.5 h-2.5 rounded-sm transition-all duration-300 ${
                    activeImage === idx ? 'bg-black w-8' : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                  aria-label={`Go to image ${idx + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Product Details */}
        <div className="p-8 md:p-16 lg:p-24 flex flex-col justify-center">
          <div className="max-w-lg w-full mx-auto lg:mx-0">
            
            {/* Breadcrumbs */}
            <nav className="text-xs font-medium text-gray-500 tracking-wide mb-8">
              <a href="/" className="hover:text-black transition-colors">Shop</a>
              <span className="mx-2">/</span>
              <a href="#" className="hover:text-black transition-colors capitalize">
                {product.category || 'Essentials'}
              </a>
              <span className="mx-2">/</span>
              <span className="text-black">{product.name}</span>
            </nav>

            {/* Title & Tags */}
            <h1 className="text-3xl md:text-5xl font-bold tracking-tight uppercase mb-4">
              {product.name}
            </h1>
            
            {/* Pricing Section (MRP, Discount, Final Price) */}
            <div className="flex items-center gap-4 mb-8 flex-wrap">
              <span className="text-xl md:text-2xl font-bold tracking-widest text-black">
                ${price.toFixed(2)} USD
              </span>
              
              {hasDiscount && (
                <>
                  <span className="text-base md:text-lg text-gray-400 line-through font-medium">
                    ${mrp.toFixed(2)}
                  </span>
                  <span className="text-xs font-bold px-2 py-1 bg-black text-white rounded-sm uppercase tracking-widest">
                    {discountPercent}% OFF
                  </span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mb-10 text-sm md:text-base whitespace-pre-wrap">
              {product.description || "Engineered for precise draping and enduring shape. A study in reductive design, eliminating all unnecessary seams for a cleaner silhouette."}
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
              <button 
                disabled={product.stock <= 0}
                className="w-full bg-black text-white py-4 text-xs font-bold tracking-widest uppercase rounded-sm hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
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
                    <li>Minimalist architecture and aesthetic</li>
                    <li>Designed for versatility</li>
                    <li>Premium monochromatic finishing</li>
                    {product.tags && product.tags.length > 0 && (
                      <li>Tags: {product.tags.join(', ')}</li>
                    )}
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