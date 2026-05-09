import React from 'react';
import { Sidebar } from '../../sidemenu'; // Removed .tsx extension to resolve esbuild error

interface AdminLayoutProps {
  children: React.ReactNode;
  activePage: string;
  headerTitle: string;
  headerActions?: React.ReactNode;
}

export const AdminLayout = ({ 
  children, 
  activePage, 
  headerTitle, 
  headerActions 
}: AdminLayoutProps) => {
  return (
    <div className="flex h-screen bg-gray-50 text-black font-sans overflow-hidden">
      
      {/* SIDEBAR */}
      <Sidebar activePage={activePage} />

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col overflow-hidden bg-white">
        
        {/* SHARED HEADER */}
        <header className="h-20 border-b border-gray-200 bg-white flex items-center justify-between px-8 lg:px-10 flex-shrink-0">
          <h2 className="text-2xl font-bold tracking-tight">{headerTitle}</h2>
          
          {/* OPTIONAL HEADER ACTIONS (Buttons, Avatars, etc) */}
          {headerActions && (
            <div className="flex items-center gap-6">
              {headerActions}
            </div>
          )}
        </header>

        {/* SCROLLABLE PAGE CONTENT */}
        <div className="flex-1 overflow-auto p-8 lg:p-10">
          {children}
        </div>
        
      </main>
    </div>
  );
};