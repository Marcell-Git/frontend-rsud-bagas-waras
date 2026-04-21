import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { Bell, Search, User, Menu, X } from "lucide-react";

const TopBar = ({ setMobileMenuOpen }) => {
  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 px-8 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg"
        >
          <Menu size={24} />
        </button>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-900">Admin RSUD</p>
            <p className="text-[10px] text-slate-500 font-medium uppercase tracking-wider">
              Super Admin
            </p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-linear-to-br from-primary-blue to-secondary-blue p-[2px]">
            <div className="w-full h-full rounded-[10px] bg-white flex items-center justify-center overflow-hidden">
              <User size={24} className="text-primary-blue" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Mobile Sidebar Overlay */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="w-72 h-full bg-slate-950 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="absolute right-6 top-6 text-slate-400 hover:text-white z-50 p-2 bg-slate-900 rounded-xl"
            >
              <X size={20} />
            </button>
            <Sidebar
              collapsed={false}
              onToggle={() => setMobileMenuOpen(false)}
              hideToggle
            />
          </div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block">
        <Sidebar
          collapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
        />
      </div>

      {/* Main Content */}
      <div
        className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? "lg:ml-20" : "lg:ml-72"}`}
      >
        <TopBar setMobileMenuOpen={setMobileMenuOpen} />

        <main className="p-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>

        <footer className="p-8 text-center text-slate-400 text-sm border-t border-slate-200 bg-white">
          <p>
            &copy; {new Date().getFullYear()} RSUD Bagas Waras. All rights
            reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout;
