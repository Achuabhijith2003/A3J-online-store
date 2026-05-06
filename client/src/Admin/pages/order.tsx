import { useState } from 'react';
import { 
  Search, 
  Bell, 
  Filter, 
  Download,
  MoreVertical,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

import {StatusBadge}  from "../../components/status.tsx" 


import {Sidebar} from '../sidemenu.tsx';

// ==========================================
// MOCK DATA
// ==========================================
const ORDERS = [
  { id: '#ORD-9025', customer: 'Emma Thompson', email: 'emma.t@example.com', date: 'Oct 26, 2023', items: 2, status: 'Pending', total: '$424.00' },
  { id: '#ORD-9024', customer: 'James Wilson', email: 'j.wilson@example.com', date: 'Oct 26, 2023', items: 1, status: 'Completed', total: '$89.00' },
  { id: '#ORD-9023', customer: 'Sophia Chen', email: 'sophia.c@example.com', date: 'Oct 25, 2023', items: 3, status: 'Completed', total: '$540.00' },
  { id: '#ORD-9022', customer: 'Oliver Martinez', email: 'oliver.m@example.com', date: 'Oct 25, 2023', items: 1, status: 'Processing', total: '$175.00' },
  { id: '#ORD-9021', customer: 'Alice Freeman', email: 'alice.f@example.com', date: 'Oct 24, 2023', items: 2, status: 'Completed', total: '$340.00' },
  { id: '#ORD-9020', customer: 'Michael Chen', email: 'michael.c@example.com', date: 'Oct 24, 2023', items: 1, status: 'Pending', total: '$125.50' },
  { id: '#ORD-9019', customer: 'Sarah Jenkins', email: 'sarah.j@example.com', date: 'Oct 23, 2023', items: 4, status: 'Completed', total: '$890.00' },
  { id: '#ORD-9018', customer: 'David Rossi', email: 'david.r@example.com', date: 'Oct 23, 2023', items: 1, status: 'Cancelled', total: '$45.00' },
];


export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen bg-white text-black font-sans overflow-hidden">
      
      {/* EXTRACTED SIDEBAR CALLED HERE */}
      <Sidebar activePage="Orders" />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        
        {/* HEADER */}
        <header className="h-20 border-b border-gray-200 bg-white flex items-center justify-between px-8 lg:px-10 flex-shrink-0">
          <h2 className="text-2xl font-bold tracking-tight">Orders</h2>
          <div className="flex items-center gap-6">
            <button className="text-gray-500 hover:text-black transition-colors relative">
              <Bell className="w-5 h-5" />
            </button>
            <div className="w-9 h-9 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-sm cursor-pointer hover:bg-gray-300 transition-colors">
              A
            </div>
          </div>
        </header>

        {/* SCROLLABLE AREA */}
        <div className="flex-1 overflow-auto p-8 lg:p-10">
          
          {/* TOOLBAR */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            
            {/* Search Input */}
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                placeholder="Search orders, customers, or emails..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm bg-white focus:border-black focus:ring-1 focus:ring-black outline-none text-sm transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-white text-black border border-gray-300 px-4 py-2.5 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors">
                <Filter size={16} />
                Filter
              </button>
              <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-black text-white px-4 py-2.5 rounded-sm text-sm font-medium hover:bg-gray-800 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="border border-gray-200 rounded-sm overflow-x-auto bg-white">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-gray-500 border-b border-gray-200 bg-white">
                <tr>
                  <th className="px-6 py-4 font-normal">Order ID</th>
                  <th className="px-6 py-4 font-normal">Customer</th>
                  <th className="px-6 py-4 font-normal">Date</th>
                  <th className="px-6 py-4 font-normal">Items</th>
                  <th className="px-6 py-4 font-normal">Status</th>
                  <th className="px-6 py-4 font-normal text-right">Total</th>
                  <th className="px-6 py-4 font-normal"></th>
                </tr>
              </thead>
              <tbody>
                {ORDERS.map((order, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors group cursor-pointer">
                    <td className="px-6 py-4 font-medium text-black">{order.id}</td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col">
                        <span className="font-medium text-black">{order.customer}</span>
                        <span className="text-xs text-gray-500 mt-0.5">{order.email}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{order.date}</td>
                    <td className="px-6 py-4 text-gray-600">{order.items}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="px-6 py-4 font-semibold text-right">{order.total}</td>
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
            <span>Showing 1 to 8 of 842 results</span>
            <div className="flex items-center gap-2">
              <button className="p-1 hover:text-black transition-colors disabled:opacity-50" disabled>
                <ChevronLeft size={18} />
              </button>
              <button className="p-1 hover:text-black transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}