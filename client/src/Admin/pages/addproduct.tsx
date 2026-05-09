import React, { useState } from 'react';
import { 
//   Search, 
//   User, 
//   ShoppingBag, 
  ArrowLeft, 
  ImagePlus, 
  ChevronDown, 
  X 
} from 'lucide-react';

export default function AddProductPage() {
  const [tags, setTags] = useState(['Minimalist', 'Autumn 24']);
  const [tagInput, setTagInput] = useState('');

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      if (!tags.includes(tagInput.trim())) {
        setTags([...tags, tagInput.trim()]);
      }
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      
      {/* 1. TOP NAVIGATION
      <header className="border-b border-gray-200 px-6 lg:px-12 h-20 flex items-center justify-between sticky top-0 bg-white z-50">
        <div className="flex items-center gap-12">
          <a href="/" className="text-xl font-bold tracking-tight">High-Contrast Monochrome</a>
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-500">
            <a href="#" className="hover:text-black transition-colors">Shop</a>
            <a href="#" className="hover:text-black transition-colors">Collections</a>
            <a href="#" className="hover:text-black transition-colors">About</a>
            <a href="#" className="hover:text-black transition-colors">Journal</a>
          </nav>
        </div>
        <div className="flex items-center gap-6 text-black">
          <button className="hover:text-gray-600 transition-colors"><Search size={20} strokeWidth={1.5} /></button>
          <button className="hover:text-gray-600 transition-colors"><User size={20} strokeWidth={1.5} /></button>
          <button className="hover:text-gray-600 transition-colors"><ShoppingBag size={20} strokeWidth={1.5} /></button>
        </div>
      </header> */}

      {/* 2. PAGE HEADER / ACTIONS */}
      <div className="px-6 lg:px-12 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <button className="text-gray-500 hover:text-black transition-colors">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button className="flex-1 sm:flex-none border border-gray-300 text-black px-6 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button className="flex-1 sm:flex-none bg-black text-white px-6 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors">
            Save Product
          </button>
        </div>
      </div>

      {/* 3. MAIN FORM CONTENT */}
      <main className="px-6 lg:px-12 pb-24 flex-1">
        <form className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (Wider) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Basic Info Section */}
            <section className="border border-gray-200 p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Product Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Minimalist Wool Trench Coat" 
                  className="w-full border border-gray-200 p-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  placeholder="Enter detailed product description..." 
                  rows={8}
                  className="w-full border border-gray-200 p-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400 resize-y"
                ></textarea>
              </div>
            </section>

            {/* Media Section */}
            <section className="border border-gray-200 p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-black">Media</h3>
                <button type="button" className="text-xs font-medium text-gray-500 hover:text-black transition-colors underline underline-offset-2">
                  Add from URL
                </button>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Add New Media Button */}
                <button 
                  type="button" 
                  className="aspect-square border border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-black hover:border-black transition-colors hover:bg-gray-50"
                >
                  <ImagePlus size={24} strokeWidth={1.5} />
                  <span className="text-xs font-medium">Add Media</span>
                </button>

                {/* Mock Uploaded Images */}
                <div className="aspect-square border border-gray-200 overflow-hidden group relative">
                  <img src="https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=400" alt="Trench coat" className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="aspect-square border border-gray-200 overflow-hidden group relative">
                  <img src="https://images.unsplash.com/photo-1584916201218-f4242ceb4809?auto=format&fit=crop&q=80&w=400" alt="Bag details" className="w-full h-full object-cover grayscale mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="aspect-square border border-gray-200 overflow-hidden group relative">
                  <img src="https://images.unsplash.com/photo-1596755094514-f87e32f8522b?auto=format&fit=crop&q=80&w=400" alt="Folded shirt" className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN (Narrower) */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            
            {/* Pricing Section */}
            <section className="border border-gray-200 p-6 flex flex-col gap-6">
              <h3 className="font-semibold text-black">Pricing</h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">Final Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input type="text" placeholder="0.00" className="w-full border border-gray-200 p-2.5 pl-8 text-sm focus:border-black outline-none transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">MRP</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input type="text" placeholder="0.00" className="w-full border border-gray-200 p-2.5 pl-8 text-sm focus:border-black outline-none transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-500">Discount %</label>
                  <input type="text" placeholder="0" className="w-full border border-gray-200 p-2.5 text-sm focus:border-black outline-none transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-gray-500">Estimated Profit</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-emerald-600 font-medium">$</span>
                    <input type="text" placeholder="0.00" readOnly className="w-full border border-gray-200 bg-gray-50 p-2.5 pl-8 text-sm outline-none text-gray-600 font-medium" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">Retail Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input type="text" placeholder="0.00" className="w-full border border-gray-200 p-2.5 pl-8 text-sm focus:border-black outline-none transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">Compare at price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input type="text" placeholder="0.00" className="w-full border border-gray-200 p-2.5 pl-8 text-sm focus:border-black outline-none transition-all" />
                </div>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input type="checkbox" id="tax" className="w-4 h-4 border-gray-300 text-black focus:ring-black rounded-sm" />
                <label htmlFor="tax" className="text-xs text-gray-600 cursor-pointer">Charge tax on this product</label>
              </div>
            </section>

            {/* Inventory Section */}
            <section className="border border-gray-200 p-6 flex flex-col gap-6">
              <h3 className="font-semibold text-black">Inventory</h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">SKU (Stock Keeping Unit)</label>
                <input type="text" placeholder="HMC-001-BLK" className="w-full border border-gray-200 p-2.5 text-sm focus:border-black outline-none transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">Quantity</label>
                <input type="text" placeholder="0" className="w-full border border-gray-200 p-2.5 text-sm focus:border-black outline-none transition-all" />
              </div>
            </section>

            {/* Categorization Section */}
            <section className="border border-gray-200 p-6 flex flex-col gap-6">
              <h3 className="font-semibold text-black">Categorization</h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">Product Category</label>
                <div className="relative">
                  <select className="w-full border border-gray-200 p-2.5 pr-10 text-sm focus:border-black outline-none transition-all appearance-none bg-white">
                    <option value="" disabled selected>Select Category</option>
                    <option value="outerwear">Outerwear</option>
                    <option value="accessories">Accessories</option>
                    <option value="shirting">Shirting</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">Tags</label>
                <input 
                  type="text" 
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={handleAddTag}
                  placeholder="Add tags (separated by comma)" 
                  className="w-full border border-gray-200 p-2.5 text-sm focus:border-black outline-none transition-all" 
                />
                
                {/* Render Tags */}
                {tags.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-2">
                    {tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 border border-gray-200 bg-gray-50 px-2 py-1 text-xs text-gray-700">
                        {tag}
                        <button 
                          type="button" 
                          onClick={() => removeTag(tag)}
                          className="text-gray-400 hover:text-black transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </section>

            {/* Product Status Section */}
            <section className="border border-gray-200 p-6 flex flex-col gap-6 bg-gray-50/50">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-black">Product Status</h3>
                <span className="bg-emerald-600 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1">
                  Active
                </span>
              </div>
              <p className="text-xs text-gray-500 leading-relaxed">
                This product will be visible to customers on all sales channels.
              </p>
              <button type="button" className="w-full border border-gray-300 bg-white text-black py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors mt-2">
                Archive Product
              </button>
            </section>

          </div>
        </form>
      </main>

      {/* 4. FOOTER */}
      <footer className="border-t border-gray-200 px-6 lg:px-12 py-8 flex flex-col md:flex-row justify-between items-center gap-4 mt-auto bg-white">
        <div className="text-lg font-bold tracking-tight text-black">High-Contrast Monochrome</div>
        <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-500 font-medium">
          <a href="#" className="hover:text-black transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-black transition-colors">Terms of Service</a>
          <a href="#" className="hover:text-black transition-colors">Shipping</a>
          <a href="#" className="hover:text-black transition-colors">Returns</a>
          <a href="#" className="hover:text-black transition-colors">Contact</a>
        </div>
        <div className="text-xs text-gray-400">
          © 2024 High-Contrast Monochrome. All rights reserved.
        </div>
      </footer>

    </div>
  );
}