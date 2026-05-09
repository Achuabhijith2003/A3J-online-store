// import { useState } from 'react';
import { 
  Users, 
  Search, 
  Bell, 
  Banknote, 
  ShoppingBag, 
  LineChart, 
  TrendingUp, 
  TrendingDown, 
  Minus,
} from 'lucide-react';

import { StatusBadge } from "../../components/status.tsx"; 
import { Sidebar } from '../sidemenu.tsx';
import { Table, type Column } from '../../components/Table.tsx'; // Import the reusable Table

// --- TYPES ---
interface RecentOrder {
  id: string;
  customer: string;
  date: string;
  status: string;
  total: string;
}

// --- MOCK DATA ---
const KPIS = [
  { title: "Total Revenue", value: "$124,500.00", change: "+12.5% from last month", trend: "up", icon: Banknote },
  { title: "Orders", value: "842", change: "+5.2% from last month", trend: "up", icon: ShoppingBag },
  { title: "Customers", value: "3,291", change: "— No change", trend: "neutral", icon: Users },
  { title: "Conversion Rate", value: "3.24%", change: "-1.1% from last month", trend: "down", icon: LineChart }
];

const RECENT_ORDERS: RecentOrder[] = [
  { id: "#ORD-9021", customer: "Alice Freeman", date: "Oct 24, 2023", status: "Completed", total: "$340.00" },
  { id: "#ORD-9020", customer: "Michael Chen", date: "Oct 24, 2023", status: "Pending", total: "$125.50" },
  { id: "#ORD-9019", customer: "Sarah Jenkins", date: "Oct 23, 2023", status: "Completed", total: "$890.00" },
  { id: "#ORD-9018", customer: "David Rossi", date: "Oct 23, 2023", status: "Cancelled", total: "$45.00" },
  { id: "#ORD-9017", customer: "Elena Smith", date: "Oct 22, 2023", status: "Completed", total: "$210.00" },
];

const TOP_PRODUCTS = [
  { name: "Minimalist Smartwatch", sales: "124 Sales", price: "$299", img: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&q=80&fit=crop" },
  { name: "Studio Headphones", sales: "98 Sales", price: "$450", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=150&q=80&fit=crop" },
  { name: "Ceramic Espresso Cups", sales: "75 Sales", price: "$85", img: "https://images.unsplash.com/photo-1610715936287-6c2ad208cdbf?w=150&q=80&fit=crop" },
  { name: "Mechanical Keyboard", sales: "62 Sales", price: "$180", img: "https://images.unsplash.com/photo-1595225476474-87563907a212?w=150&q=80&fit=crop" },
];

// --- TABLE COLUMNS CONFIGURATION ---
const recentOrderColumns: Column<RecentOrder>[] = [
  { header: 'Order ID', accessor: 'id', render: (o) => <span className="text-gray-600">{o.id}</span> },
  { header: 'Customer', accessor: 'customer', render: (o) => <span className="font-medium">{o.customer}</span> },
  { header: 'Date', accessor: 'date', render: (o) => <span className="text-gray-500">{o.date}</span> },
  { header: 'Status', accessor: 'status', render: (o) => <StatusBadge status={o.status} /> },
  { header: 'Total', accessor: 'total', align: 'right', render: (o) => <span className="font-semibold">{o.total}</span> }
];

export default function Dashboard() {
  return (
    <div className="flex h-screen bg-gray-50 text-black font-sans overflow-hidden">
      
      {/* EXTRACTED SIDEBAR - Pass active page here */}
      <Sidebar activePage="Overview" />

      {/* MAIN CONTENT */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        
        {/* HEADER */}
        <header className="h-20 border-b border-gray-200 bg-white flex items-center justify-between px-8 lg:px-10 flex-shrink-0">
          <h2 className="text-2xl font-bold tracking-tight">Dashboard Overview</h2>
          <div className="flex items-center gap-6">
            <button className="text-gray-500 hover:text-black transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="text-gray-500 hover:text-black transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-2 h-2 bg-black rounded-full border-2 border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full overflow-hidden border border-gray-200 cursor-pointer">
              <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80&fit=crop" alt="User Avatar" className="w-full h-full object-cover" />
            </div>
          </div>
        </header>

        {/* SCROLLABLE DASHBOARD AREA */}
        <div className="flex-1 overflow-auto p-8 lg:p-10">
          
          {/* KPI GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {KPIS.map((kpi, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-sm p-6 flex flex-col hover:shadow-sm transition-shadow">
                <div className="flex justify-between items-start mb-4">
                  <span className="text-xs font-medium tracking-widest uppercase text-gray-500">{kpi.title}</span>
                  <kpi.icon className="w-5 h-5 text-gray-400" />
                </div>
                <div className="text-3xl font-bold tracking-tight mb-3">{kpi.value}</div>
                <div className={`text-xs flex items-center gap-1 font-medium
                  ${kpi.trend === 'up' ? 'text-emerald-600' : 
                    kpi.trend === 'down' ? 'text-red-600' : 'text-gray-500'}`}
                >
                  {kpi.trend === 'up' && <TrendingUp size={14} />}
                  {kpi.trend === 'down' && <TrendingDown size={14} />}
                  {kpi.trend === 'neutral' && <Minus size={14} />}
                  {kpi.change}
                </div>
              </div>
            ))}
          </div>

          {/* TWO COLUMN SECTION */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            
            {/* RECENT ORDERS (USING NEW REUSABLE TABLE) */}
            <div className="lg:col-span-2">
              <div className="flex justify-between items-end mb-6">
                <h3 className="text-xl font-bold tracking-tight">Recent Orders</h3>
                <a href="/admin/orders" className="text-sm font-medium text-gray-600 hover:text-black border-b border-gray-300 hover:border-black pb-0.5 transition-all">View All</a>
              </div>
              
              {/* Using the abstracted Table component here! */}
              <Table 
                data={RECENT_ORDERS} 
                columns={recentOrderColumns} 
              />
              
            </div>

            {/* TOP PRODUCTS LIST */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-bold tracking-tight mb-6">Top Products</h3>
              <div className="border border-gray-200 rounded-sm bg-white">
                {TOP_PRODUCTS.map((product, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 border-b border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors cursor-pointer group">
                    <div className="w-14 h-14 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0 border border-gray-200">
                       <img src={product.img} alt={product.name} className="w-full h-full object-cover mix-blend-multiply group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="flex-1 min-w-0">
                       <h4 className="font-medium text-sm truncate text-black">{product.name}</h4>
                       <p className="text-xs text-gray-500 mt-0.5">{product.sales}</p>
                    </div>
                    <div className="font-semibold text-sm">{product.price}</div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}