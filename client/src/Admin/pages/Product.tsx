import { 
  Search, 
  Bell, 
  Plus,
  MoreVertical,
  AlertTriangle,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { AdminLayout } from './layout/overview'; // Adjust path as needed

const PRODUCTS = [
  { id: 'SKU-001', name: 'Minimalist White Chair', price: '$249.00', stock: 45, status: 'Active', img: 'https://images.unsplash.com/photo-1506459225024-1428097a7e18?w=150&q=80&fit=crop' },
  { id: 'SKU-002', name: 'Black Ceramic Vase', price: '$89.00', stock: 3, status: 'Active', img: 'https://images.unsplash.com/photo-1610715936287-6c2ad208cdbf?w=150&q=80&fit=crop' },
  { id: 'SKU-003', name: 'Monochrome Wool Throw', price: '$120.00', stock: 0, status: 'Draft', img: 'https://images.unsplash.com/photo-1580870059816-5544d6db537d?w=150&q=80&fit=crop' },
  { id: 'SKU-004', name: 'Concrete Table Lamp', price: '$175.00', stock: 12, status: 'Active', img: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=150&q=80&fit=crop' },
];

export default function ProductsPage() {
  
  // Define what goes on the right side of the header for this specific page
  const headerActions = (
    <>
      <button className="text-gray-500 hover:text-black transition-colors relative">
        <Bell className="w-5 h-5" />
      </button>
      <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-sm cursor-pointer hover:bg-gray-300 transition-colors">
        A
      </div>
    </>
  );

  return (
    <AdminLayout activePage="Products" headerTitle="Products" headerActions={headerActions}>
      
      {/* TOOLBAR */}
      <div className="flex justify-between items-center mb-6">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search inventory..." 
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm bg-white focus:border-black focus:ring-1 focus:ring-black outline-none text-sm transition-all placeholder:text-gray-400"
          />
        </div>
        <button className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors">
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* TABLE CONTAINER */}
      <div className="border border-gray-200 rounded-sm overflow-x-auto bg-white">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-gray-500 border-b border-gray-200 bg-white">
            <tr>
              <th className="px-6 py-4 font-normal">Image</th>
              <th className="px-6 py-4 font-normal">Product Name</th>
              <th className="px-6 py-4 font-normal">SKU</th>
              <th className="px-6 py-4 font-normal">Price</th>
              <th className="px-6 py-4 font-normal">Stock</th>
              <th className="px-6 py-4 font-normal">Status</th>
              <th className="px-6 py-4 font-normal"></th>
            </tr>
          </thead>
          <tbody>
            {PRODUCTS.map((product, index) => (
              <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors group">
                <td className="px-6 py-4">
                  <div className="w-12 h-12 bg-gray-100 border border-gray-200 rounded-sm overflow-hidden">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                  </div>
                </td>
                <td className="px-6 py-4 font-medium text-black">{product.name}</td>
                <td className="px-6 py-4 text-gray-500">{product.id}</td>
                <td className="px-6 py-4 font-semibold">{product.price}</td>
                <td className="px-6 py-4">
                  {product.stock === 0 ? (
                    <span className="text-red-600 font-semibold">0</span>
                  ) : product.stock < 5 ? (
                    <span className="text-red-600 font-semibold flex items-center gap-1">
                      {product.stock} <AlertTriangle size={14} />
                    </span>
                  ) : (
                    <span className="text-gray-900">{product.stock}</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  {product.status === 'Active' ? (
                    <span className="px-2.5 py-1 bg-gray-200 text-gray-700 text-xs font-medium rounded-sm">Active</span>
                  ) : (
                    <span className="px-2.5 py-1 bg-white border border-gray-300 text-gray-600 text-xs font-medium rounded-sm">Draft</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button className="p-1.5 text-gray-400 hover:text-black rounded-sm hover:bg-gray-100 transition-colors">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION FOOTER */}
      <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
        <span>Showing 1 to 4 of 48 results</span>
        <div className="flex items-center gap-2">
          <button className="p-1 hover:text-black transition-colors disabled:opacity-50">
            <ChevronLeft size={18} />
          </button>
          <button className="p-1 hover:text-black transition-colors">
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
      
    </AdminLayout>
  );
}