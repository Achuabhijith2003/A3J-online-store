import { useState } from 'react';
import { Search, Download } from 'lucide-react';
import { StatusBadge } from "../../components/status";
import { AdminLayout } from './layout/overview.tsx';
import { Table } from '../../components/Table.tsx';



// 1. Define the shape of your customer data
interface Customer {
  initials: string;
  name: string;
  email: string;
  orders: number;
  spend: string;
  status: string;
  id?: string; // Optional, if you use it in your actions later
}

// 2. Replace 'any' with 'Customer'
const customerColumns = [
  {
    header: 'Name',
    accessor: 'name',
    render: (customer: Customer) => (
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-sm flex-shrink-0">
          {customer.initials}
        </div>
        <span className="font-medium text-black">{customer.name}</span>
      </div>
    )
  },
  { header: 'Email', accessor: 'email', render: (c: Customer) => <span className="text-gray-500">{c.email}</span> },
  { header: 'Total Orders', accessor: 'orders', align: 'right' as const, render: (c: Customer) => <span className="text-gray-700 text-base">{c.orders}</span> },
  { header: 'Total Spend', accessor: 'spend', align: 'right' as const, render: (c: Customer) => <span className="font-semibold text-black text-base">{c.spend}</span> },
  { header: 'Status', accessor: 'status', render: (c: Customer) => <StatusBadge status={c.status} /> },
];

const CUSTOMERS = [
  { initials: 'ES', name: 'Eleanor Shellstrop', email: 'eleanor@example.com', orders: 24, spend: '$3,450.00', status: 'Active' },
  { initials: 'CD', name: 'Chidi Anagonye', email: 'chidi@example.com', orders: 12, spend: '$1,205.50', status: 'Active' },
  { initials: 'TA', name: 'Tahani Al-Jamil', email: 'tahani@example.com', orders: 89, spend: '$45,900.00', status: 'Active' },
  { initials: 'JM', name: 'Jason Mendoza', email: 'jason@example.com', orders: 3, spend: '$45.00', status: 'Inactive' },
  { initials: 'MH', name: 'Michael', email: 'michael@example.com', orders: 0, spend: '$0.00', status: 'Pending' },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const headerActions = (
    <button className="flex items-center justify-center gap-2 bg-white text-black border border-gray-300 px-4 py-2 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors">
      <Download size={16} />
      Export CSV
    </button>
  );

  return (
    <AdminLayout activePage="Customers" headerTitle="Customers" headerActions={headerActions}>

      {/* TOOLBAR */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
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
        <div className="text-sm text-gray-500">
          Showing 1-6 of 2,405
        </div>
      </div>

      {/* TABLE CONTAINER */}
      <div className="border border-gray-200 rounded-sm overflow-x-auto bg-white">
        <Table
          data={CUSTOMERS}
          columns={customerColumns}

          // Optional: Pass an action button or link
          // actions={(customer) => (
          //   <a href={`/customers/${customer}`} className="text-blue-600 hover:underline">
          //     View Profile
          //   </a>
          // )}
        />
      </div>

    </AdminLayout>
  );
}