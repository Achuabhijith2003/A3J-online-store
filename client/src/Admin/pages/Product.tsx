import { useState, useEffect } from 'react';
import {
  Search,
  Bell,
  Plus,
  ChevronLeft,
  ChevronRight,
  Loader2
} from 'lucide-react';

import { AdminLayout } from './layout/overview';
import { Table } from '../../components/Table.tsx';
import { StatusBadge } from "../../components/status";
import { useNavigate } from "react-router-dom";

// Update interface to match the database backend structure
interface Product {
  id: string;
  name: string;
  price: number;
  stock: number;
  status: string;
  main_image_url?: string;
}

const ProductColumns = [
  {
    header: 'Name',
    accessor: 'name',
    render: (product: Product) => (
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-sm overflow-hidden flex-shrink-0 bg-gray-100 border border-gray-200">
          {product.main_image_url ? (
             <img src={product.main_image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
             <div className="w-full h-full flex items-center justify-center text-gray-400 text-[10px] uppercase font-bold tracking-tighter">No Img</div>
          )}
        </div>
        <span className="font-medium text-black">{product.name}</span>
      </div>
    )
  },
  { 
    header: 'SKU / ID', 
    accessor: 'id', 
    render: (c: Product) => <span className="text-gray-500">{(c.id || '').substring(0, 8)}...</span> 
  },
  { 
    header: 'Stock', 
    accessor: 'stock', 
    align: 'right' as const, 
    render: (c: Product) => <span className="text-gray-700 text-base">{c.stock}</span> 
  },
  { 
    header: 'Price', 
    accessor: 'price', 
    align: 'right' as const, 
    render: (c: Product) => <span className="font-semibold text-black text-base">${Number(c.price).toFixed(2)}</span> 
  },
  { 
    header: 'Status', 
    accessor: 'status', 
    render: (c: Product) => <StatusBadge status={c.status || 'Draft'} /> 
  },
];

export default function ProductsPage() {
  const navigate = useNavigate();
  
  // State to hold data from the API
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch products when the component loads
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }

        const data = await response.json();
        // Set the products from the API response
        setProducts(data.products || []);
      } catch (err: unknown) {
        console.error("Error fetching products:", err);
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Define what goes on the right side of the header for this specific page
  const headerActions = (
    <>
      <button className="text-gray-500 hover:text-black transition-colors relative" onClick={() => navigate("/admin/products/addproduct")}>
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
        <button 
          onClick={() => navigate("/admin/products/addproduct")}
          className="flex items-center gap-2 bg-black text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors"
        >
          <Plus size={16} />
          Add Product
        </button>
      </div>

      {/* TABLE CONTAINER */}
      <div className="border border-gray-200 rounded-sm overflow-x-auto bg-white min-h-[400px]">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
            <Loader2 className="w-8 h-8 animate-spin mb-4 text-black" />
            <p className="text-sm font-medium">Loading inventory...</p>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-red-500">
            <p className="text-sm font-medium">Error: {error}</p>
          </div>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-[400px] text-gray-500">
            <p className="text-sm font-medium">No products found. Add a new product to get started.</p>
          </div>
        ) : (
          <Table
            data={products}
            columns={ProductColumns}
          />
        )}
      </div>

      {/* PAGINATION FOOTER */}
      {!isLoading && products.length > 0 && (
        <div className="flex justify-between items-center mt-6 text-sm text-gray-500">
          <span>Showing 1 to {products.length} of {products.length} results</span>
          <div className="flex items-center gap-2">
            <button className="p-1 hover:text-black transition-colors disabled:opacity-50" disabled>
              <ChevronLeft size={18} />
            </button>
            <button className="p-1 hover:text-black transition-colors" disabled>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

    </AdminLayout>
  );
}