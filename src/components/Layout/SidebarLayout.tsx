import { ReactNode, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

interface SidebarLayoutProps {
  sidebar: ReactNode;
  children: ReactNode;
}

export const SidebarLayout = ({ sidebar, children }: SidebarLayoutProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen relative">
      {/* Mobile sidebar toggle button */}
      <button
        className="md:hidden fixed bottom-4 left-4 z-40 bg-[#500000] text-white p-2 rounded-full shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
      >
        {sidebarOpen ? <FiChevronLeft size={24} /> : <FiChevronRight size={24} />}
      </button>

      {/* Sidebar - responsive behavior */}
      <aside
        className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} 
        md:translate-x-0 transform transition-transform duration-300 ease-in-out
        fixed md:static inset-y-0 left-0 z-30 w-64 bg-white shadow-lg md:shadow-none
        border-r border-gray-200 overflow-y-auto`}
      >
        {sidebar}
      </aside>

      {/* Main content */}
      <main
        className={`flex-1 ${sidebarOpen ? 'ml-64' : 'ml-0'} 
        md:ml-0 transition-all duration-300 ease-in-out
        bg-gray-50 p-4 sm:p-6 overflow-x-hidden`}
      >
        {children}
      </main>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </div>
  );
};