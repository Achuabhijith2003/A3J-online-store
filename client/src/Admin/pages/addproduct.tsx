import React, { useState, useRef } from 'react';
import { 
  ArrowLeft, 
  ImagePlus, 
  ChevronDown, 
  X,
  Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AddProductPage() {
  const navigate = useNavigate();
  
  // Text Fields
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [finalPrice, setFinalPrice] = useState('');
  const [mrp, setMrp] = useState(''); // Max Selling Price
  const [retailPrice, setRetailPrice] = useState('');
  const [comparePrice, setComparePrice] = useState('');
  const [sku, setSku] = useState('');
  const [quantity, setQuantity] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('Active');
  
  // Tags
  const [tags, setTags] = useState<string[]>(['Minimalist']);
  const [tagInput, setTagInput] = useState('');

  // Images
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [subImages, setSubImages] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Status state
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

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

  // Trigger hidden file input
  const handleAddMediaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  // Handle file selection (assigns to Main Image first, then fills Sub Images up to 5)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    
    if (files.length === 0) return;

    if (!mainImage) {
      // First selected image becomes the main image
      setMainImage(files[0]);
      // Remaining images become sub images (up to 5 max total)
      const remaining = files.slice(1);
      if (remaining.length > 0) {
        setSubImages(prev => [...prev, ...remaining].slice(0, 5));
      }
    } else {
      // If main image exists, add all to sub images
      setSubImages(prev => [...prev, ...files].slice(0, 5));
    }
    
    // Reset input so the same file can be selected again if removed
    e.target.value = '';
  };

  const removeMainImage = () => setMainImage(null);
  const removeSubImage = (index: number) => {
    setSubImages(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('name', title);
      formData.append('description', description);
      formData.append('price', finalPrice);
      formData.append('retail_price', retailPrice);
      formData.append('max_selling_price', mrp);
      formData.append('stock', quantity);
      formData.append('status', status);
      formData.append('category', category);
      formData.append('tags', JSON.stringify(tags));

      if (mainImage) {
        formData.append('main_image', mainImage);
      }

      subImages.forEach(file => {
        formData.append('sub_images', file);
      });

      const token = localStorage.getItem('token');
      const response = await fetch('/api/products/addproducts', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData, // Do NOT set Content-Type header. Browser handles boundaries automatically for FormData!
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create product');
      }

      // Success
      navigate('/admin/products');
      
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white text-black font-sans flex flex-col">
      {/* 1. PAGE HEADER / ACTIONS */}
      <div className="px-6 lg:px-12 py-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate(-1)} className="text-gray-500 hover:text-black transition-colors">
            <ArrowLeft size={24} strokeWidth={1.5} />
          </button>
          <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button 
            type="button" 
            onClick={() => navigate(-1)}
            className="flex-1 sm:flex-none border border-gray-300 text-black px-6 py-2.5 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            form="add-product-form"
            disabled={isLoading}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-black text-white px-6 py-2.5 text-sm font-medium hover:bg-gray-800 disabled:opacity-70 transition-colors"
          >
            {isLoading && <Loader2 size={16} className="animate-spin" />}
            {isLoading ? 'Saving...' : 'Save Product'}
          </button>
        </div>
      </div>

      {/* 2. ERROR DISPLAY */}
      {error && (
        <div className="mx-6 lg:mx-12 mt-6 p-4 bg-red-50 border border-red-200 text-red-600 rounded-sm text-sm font-medium">
          {error}
        </div>
      )}

      {/* 3. MAIN FORM CONTENT */}
      <main className="px-6 lg:px-12 py-8 pb-24 flex-1">
        <form id="add-product-form" onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* LEFT COLUMN (Wider) */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            
            {/* Basic Info Section */}
            <section className="border border-gray-200 p-6 flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Product Title</label>
                <input 
                  type="text" 
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Minimalist Wool Trench Coat" 
                  className="w-full border border-gray-200 p-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400"
                />
              </div>
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-gray-700">Description</label>
                <textarea 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Enter detailed product description..." 
                  rows={8}
                  className="w-full border border-gray-200 p-3 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all placeholder:text-gray-400 resize-y"
                ></textarea>
              </div>
            </section>

            {/* Media Section */}
            <section className="border border-gray-200 p-6 flex flex-col gap-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-semibold text-black">Media (Main + Up to 5 Sub Images)</h3>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  multiple 
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden" 
                />
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {/* Add New Media Button */}
                <button 
                  type="button" 
                  onClick={handleAddMediaClick}
                  className="aspect-square border border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-black hover:border-black transition-colors hover:bg-gray-50"
                >
                  <ImagePlus size={24} strokeWidth={1.5} />
                  <span className="text-xs font-medium">Add Media</span>
                </button>

                {/* Display Main Image Preview */}
                {mainImage && (
                  <div className="aspect-square border border-gray-200 overflow-hidden group relative">
                    <img 
                      src={URL.createObjectURL(mainImage)} 
                      alt="Main Preview" 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <div className="absolute top-2 left-2 bg-black text-white text-[10px] uppercase font-bold px-2 py-0.5 z-10">Main</div>
                    <button type="button" onClick={removeMainImage} className="absolute top-2 right-2 bg-white/90 text-black p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                      <X size={14} />
                    </button>
                  </div>
                )}

                {/* Display Sub Image Previews */}
                {subImages.map((file, index) => (
                  <div key={index} className="aspect-square border border-gray-200 overflow-hidden group relative">
                    <img 
                      src={URL.createObjectURL(file)} 
                      alt={`Sub Preview ${index + 1}`} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                    <button type="button" onClick={() => removeSubImage(index)} className="absolute top-2 right-2 bg-white/90 text-black p-1 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity shadow-sm">
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN (Narrower) */}
          <div className="lg:col-span-1 flex flex-col gap-8">
            
            {/* Pricing Section */}
            <section className="border border-gray-200 p-6 flex flex-col gap-6">
              <h3 className="font-semibold text-black">Pricing</h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">Final Price (Required)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input 
                    type="number" 
                    required 
                    step="0.01"
                    value={finalPrice}
                    onChange={(e) => setFinalPrice(e.target.value)}
                    placeholder="0.00" 
                    className="w-full border border-gray-200 p-2.5 pl-8 text-sm focus:border-black outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">Max Selling Price (MRP)</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    value={mrp}
                    onChange={(e) => setMrp(e.target.value)}
                    placeholder="0.00" 
                    className="w-full border border-gray-200 p-2.5 pl-8 text-sm focus:border-black outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">Retail Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    value={retailPrice}
                    onChange={(e) => setRetailPrice(e.target.value)}
                    placeholder="0.00" 
                    className="w-full border border-gray-200 p-2.5 pl-8 text-sm focus:border-black outline-none transition-all" 
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">Compare at price</label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input 
                    type="number" 
                    step="0.01"
                    value={comparePrice}
                    onChange={(e) => setComparePrice(e.target.value)}
                    placeholder="0.00" 
                    className="w-full border border-gray-200 p-2.5 pl-8 text-sm focus:border-black outline-none transition-all" 
                  />
                </div>
              </div>
            </section>

            {/* Inventory Section */}
            <section className="border border-gray-200 p-6 flex flex-col gap-6">
              <h3 className="font-semibold text-black">Inventory</h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">SKU (Stock Keeping Unit)</label>
                <input 
                  type="text" 
                  value={sku}
                  onChange={(e) => setSku(e.target.value)}
                  placeholder="HMC-001-BLK" 
                  className="w-full border border-gray-200 p-2.5 text-sm focus:border-black outline-none transition-all" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">Quantity (Required)</label>
                <input 
                  type="number" 
                  required
                  min="0"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  placeholder="0" 
                  className="w-full border border-gray-200 p-2.5 text-sm focus:border-black outline-none transition-all" 
                />
              </div>
            </section>

            {/* Categorization Section */}
            <section className="border border-gray-200 p-6 flex flex-col gap-6">
              <h3 className="font-semibold text-black">Categorization</h3>
              
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-gray-500">Product Category</label>
                <div className="relative">
                  <select 
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full border border-gray-200 p-2.5 pr-10 text-sm focus:border-black outline-none transition-all appearance-none bg-white"
                  >
                    <option value="" disabled>Select Category</option>
                    <option value="outerwear">Outerwear</option>
                    <option value="accessories">Accessories</option>
                    <option value="shirting">Shirting</option>
                    <option value="footwear">Footwear</option>
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
                  placeholder="Press enter to add tag" 
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
                <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-1 ${status === 'Active' ? 'bg-emerald-600 text-white' : 'bg-amber-600 text-white'}`}>
                  {status}
                </span>
              </div>
              <div className="relative">
                <select 
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full border border-gray-200 p-2.5 pr-10 text-sm focus:border-black outline-none transition-all appearance-none bg-white"
                >
                  <option value="Active">Active</option>
                  <option value="Draft">Draft</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
              </div>
            </section>

          </div>
        </form>
      </main>

    </div>
  );
}