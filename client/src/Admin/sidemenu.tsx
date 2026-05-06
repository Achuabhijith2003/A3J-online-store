import  { useState } from 'react';
import { 
  LayoutGrid, 
  ShoppingCart, 
  Package, 
  Users, 
  Settings, 
//   Search, 
//   Bell, 
//   Plus,
//   MoreVertical,
//   AlertTriangle,
//   ChevronLeft,
//   ChevronRight,
BarChart2,
  Menu
} from 'lucide-react';

export const Sidebar = ({ activePage = 'Overview' }: { activePage?: string }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const navItems = [
    { name: 'Overview', icon: LayoutGrid, path: '/admin/dashboard' },
    { name: 'Orders', icon: ShoppingCart, path: '/admin/orders' },
    { name: 'Products', icon: Package, path: '/admin/products' },
    { name: 'Customers', icon: Users, path: '/admin/customers' },
    { name: 'Analytics', icon: BarChart2, path: '/admin/analytics' },
  ];

  return (
    <aside 
      className={`bg-white border-r border-gray-200 flex flex-col justify-between flex-shrink-0 z-10 transition-all duration-300 ease-in-out ${
        isExpanded ? 'w-64' : 'w-20'
      }`}
    >
      <div>
        {/* Header/Logo Area */}
        <div className={`h-20 flex items-center border-b border-gray-200 ${isExpanded ? 'px-6 justify-between' : 'justify-center'}`}>
          {isExpanded && <h1 className="text-xl font-bold tracking-tight truncate">HCM Brand</h1>}
          <button 
            onClick={() => setIsExpanded(!isExpanded)} 
            className="p-2 rounded-sm hover:bg-gray-100 text-gray-500 hover:text-black transition-colors focus:outline-none focus:ring-1 focus:ring-black"
            title={isExpanded ? "Collapse Sidebar" : "Expand Sidebar"}
          >
            <Menu size={20} />
          </button>
        </div>

        {/* Navigation Links */}
        <nav className={`p-4 space-y-1 ${!isExpanded && 'flex flex-col items-center'}`}>
          {navItems.map((item) => {
            const isActive = item.name === activePage;
            const Icon = item.icon;
            
            return (
              <a 
                key={item.name}
                href={item.path} 
                title={!isExpanded ? item.name : undefined}
                className={`flex items-center ${isExpanded ? 'gap-3 px-4 w-full' : 'justify-center w-10'} py-3 rounded-sm font-medium text-sm transition-colors ${
                  isActive 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-black'
                }`}
              >
                <Icon size={18} /> 
                {isExpanded && <span>{item.name}</span>}
              </a>
            );
          })}
        </nav>
      </div>

      {/* Settings / Footer Area */}
      <div className={`p-4 border-t border-gray-200 flex ${isExpanded ? 'justify-start' : 'justify-center'}`}>
        <a 
          href="/admin/settings" 
          title={!isExpanded ? "Settings" : undefined}
          className={`flex items-center ${isExpanded ? 'gap-3 px-4 w-full' : 'justify-center w-10'} py-3 text-gray-600 hover:bg-gray-100 hover:text-black rounded-sm font-medium text-sm transition-colors`}
        >
          <Settings size={18} />
          {isExpanded && <span>Settings</span>}
        </a>
      </div>
    </aside>
  );
};
