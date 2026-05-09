import { 
  Search, 
  Bell, 
  Plus,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';

import { AdminLayout } from './layout/overview';
import { Table } from '../../components/Table.tsx';
import { StatusBadge } from "../../components/status";


interface Product {
  id: string;
  name: string;
  price: string;
  stock: number;
  status: string;
  img: string;
}

const ProductColumns = [
  {
    header: 'Name',
    accessor: 'name',
    render: (Product: Product) => (
      <div className="flex items-center gap-4">
        <img src={Product.img} alt={Product.name} className="w-10 h-10 rounded-sm object-cover flex-shrink-0" />
        <span className="font-medium text-black">{Product.name}</span>
      </div>
    )
  },
  { header: 'SKU', accessor: 'id', render: (c: Product) => <span className="text-gray-500">{c.id}</span> },
  { header: 'Stock', accessor: 'stock', align: 'right' as const, render: (c: Product) => <span className="text-gray-700 text-base">{c.stock}</span> },
  { header: 'Price', accessor: 'price', align: 'right' as const, render: (c: Product) => <span className="font-semibold text-black text-base">{c.price}</span> },
  { header: 'Status', accessor: 'status', render: (c: Product) => <StatusBadge status={c.status} /> },
];


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
        <div className="border border-gray-200 rounded-sm overflow-x-auto bg-white">
        <Table
          data={PRODUCTS}
          columns={ProductColumns}

          // Optional: Pass an action button or link
          // actions={(customer) => (
          //   <a href={`/customers/${customer}`} className="text-blue-600 hover:underline">
          //     View Profile
          //   </a>
          // )}
        />
      </div>
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