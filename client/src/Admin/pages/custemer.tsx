import { useState } from 'react';
import { 
  Search, 
  Download,
} from 'lucide-react';

import {StatusBadge}  from "../../components/status.tsx" 


import {Sidebar} from '../sidemenu.tsx';

// ==========================================
// MOCK DATA
// ==========================================
const CUSTOMERS = [
  { initials: 'ES', name: 'Eleanor Shellstrop', email: 'eleanor@example.com', orders: 24, spend: '$3,450.00', status: 'Active' },
  { initials: 'CD', name: 'Chidi Anagonye', email: 'chidi@example.com', orders: 12, spend: '$1,205.50', status: 'Active' },
  { initials: 'TA', name: 'Tahani Al-Jamil', email: 'tahani@example.com', orders: 89, spend: '$45,900.00', status: 'Active' },
  { initials: 'JM', name: 'Jason Mendoza', email: 'jason@example.com', orders: 3, spend: '$45.00', status: 'Inactive' },
  { initials: 'MH', name: 'Michael', email: 'michael@example.com', orders: 0, spend: '$0.00', status: 'Pending' },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex h-screen bg-white text-black font-sans overflow-hidden">
      
      {/* EXTRACTED SIDEBAR CALLED HERE */}
      <Sidebar activePage="Customers" />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        
        {/* HEADER */}
        <header className="h-24 border-b border-gray-200 bg-white flex items-center justify-between px-8 lg:px-10 flex-shrink-0">
          <h2 className="text-3xl font-bold tracking-tight">Customers</h2>
          <button className="flex items-center justify-center gap-2 bg-white text-black border border-gray-300 px-4 py-2 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors">
            <Download size={16} />
            Export CSV
          </button>
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
                placeholder="Search customers..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-sm bg-white focus:border-black focus:ring-1 focus:ring-black outline-none text-sm transition-all placeholder:text-gray-400"
              />
            </div>

            {/* Record Count */}
            <div className="text-sm text-gray-500">
              Showing 1-6 of 2,405
            </div>
          </div>

          {/* TABLE CONTAINER */}
          <div className="border border-gray-200 rounded-sm overflow-x-auto bg-white">
            <table className="w-full text-sm text-left whitespace-nowrap">
              <thead className="text-gray-500 border-b border-gray-200 bg-gray-50/30">
                <tr>
                  <th className="px-6 py-4 font-normal">Name</th>
                  <th className="px-6 py-4 font-normal">Email</th>
                  <th className="px-6 py-4 font-normal text-right">Total Orders</th>
                  <th className="px-6 py-4 font-normal text-right">Total Spend</th>
                  <th className="px-6 py-4 font-normal">Status</th>
                </tr>
              </thead>
              <tbody>
                {CUSTOMERS.map((customer, index) => (
                  <tr key={index} className="border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-sm flex-shrink-0">
                          {customer.initials}
                        </div>
                        <span className="font-medium text-black">{customer.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-500">{customer.email}</td>
                    <td className="px-6 py-4 text-gray-700 text-right text-base">{customer.orders}</td>
                    <td className="px-6 py-4 font-semibold text-black text-right text-base">{customer.spend}</td>
                    <td className="px-6 py-4">
                      <StatusBadge status={customer.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      </main>
    </div>
  );
}