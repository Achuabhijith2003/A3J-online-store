import { type ReactNode } from 'react';

export interface Column<T> {
  header: string;
  accessor: string;
  align?: 'left' | 'center' | 'right';
  // Optional render function for custom UI (images, badges, formatting)
  render?: (item: T) => ReactNode;
}

export interface TableProps<T> {
  data: T[];
  columns: Column<T>[];
  // Function to extract a unique key for each row
  keyExtractor?: (item: T, index: number) => string | number;
  // Optional click handler for making the whole row clickable
  onRowClick?: (item: T) => void;
  // Optional render function for an actions column (links, edit buttons, etc.)
  actions?: (item: T) => ReactNode;
}

export function Table<T>({ 
  data, 
  columns, 
  keyExtractor = (_, index) => index, 
  onRowClick, 
}: TableProps<T>) {
  return (
    <div className="border border-gray-200 rounded-sm overflow-x-auto bg-white">
      <table className="w-full text-sm text-left whitespace-nowrap">
        
        {/* TABLE HEADERS */}
        <thead className="text-gray-500 border-b border-gray-200 bg-gray-50/30">
          <tr>
            {columns.map((col, idx) => (
              <th 
                key={col.accessor || idx} 
                className={`px-6 py-4 font-normal ${
                  col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                }`}
              >
                {col.header}
              </th>
            ))}
          </tr>
        </thead>

        {/* TABLE BODY */}
        <tbody>
          {data.map((item, index) => (
            <tr 
              key={keyExtractor(item, index)} 
              onClick={() => onRowClick?.(item)}
              className={`border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors group ${
                onRowClick ? 'cursor-pointer' : ''
              }`}
            >
              
              {/* Dynamic Columns */}
              {columns.map((col, idx) => (
                <td 
                  key={col.accessor || idx} 
                  className={`px-6 py-4 ${
                    col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'
                  }`}
                >
                  {/* If a custom render function is provided, use it. Otherwise, display the raw data. */}
                  {col.render ? col.render(item) : String(item[col.accessor as keyof T] ?? '')}
                </td>
              ))}
              
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  );
}



// Sample envoke table 

// import { Table } from '../../components/Table';

// // 1. Define your columns
// const customerColumns = [
//   { 
//     header: 'Name', 
//     accessor: 'name',
//     render: (customer: any) => (
//       <div className="flex items-center gap-4">
//         <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-700 font-medium text-sm flex-shrink-0">
//           {customer.initials}
//         </div>
//         <span className="font-medium text-black">{customer.name}</span>
//       </div>
//     )
//   },
//   { header: 'Email', accessor: 'email', render: (c: any) => <span className="text-gray-500">{c.email}</span> },
//   { header: 'Total Orders', accessor: 'orders', align: 'right' as const, render: (c: any) => <span className="text-gray-700 text-base">{c.orders}</span> },
//   { header: 'Total Spend', accessor: 'spend', align: 'right' as const, render: (c: any) => <span className="font-semibold text-black text-base">{c.spend}</span> },
//   { header: 'Status', accessor: 'status', render: (c: any) => <StatusBadge status={c.status} /> },
// ];

// // 2. Render it!
// return (
//   <Table 
//     data={CUSTOMERS} 
//     columns={customerColumns}
    
//     // Optional: Pass an action button or link
//     actions={(customer) => (
//       <a href={`/customers/${customer.id}`} className="text-blue-600 hover:underline">
//         View Profile
//       </a>
//     )}
//   />
// );