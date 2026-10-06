import { useState, ReactNode } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  ShoppingBag,
  FolderOpen,
  MessageSquare,
  Instagram,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Sun,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';

const navItems = [
  { href: '/admin_access/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin_access/products', label: 'Products', icon: ShoppingBag },
  { href: '/admin_access/categories', label: 'Categories', icon: FolderOpen },
  { href: '/admin_access/testimonials', label: 'Testimonials', icon: MessageSquare },
  { href: '/admin_access/instagram', label: 'Instagram', icon: Instagram },
  { href: '/admin_access/settings', label: 'Settings', icon: Settings },
];

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = ({ children }: AdminLayoutProps) => {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/admin_access');
  };

  return (
    <div className="min-h-screen bg-white dark:bg-[#121214] transition-colors">
      {/* Sidebar Overlay for Mobile */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={() => setIsSidebarOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 bottom-0 z-50 bg-white dark:bg-[#1C1C21] border-r border-[#EAE2D7] dark:border-stone-800 transition-all duration-300 ${
          isSidebarCollapsed ? 'w-20' : 'w-64'
        } ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        aria-label="Admin sidebar navigation"
      >
        {/* Logo */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-[#EAE2D7] dark:border-stone-800">
          {!isSidebarCollapsed && (
            <NavLink to="/admin_access/dashboard" className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B6508] to-[#B8860B] flex items-center justify-center">
                <ShoppingBag className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <span className="font-heading text-xl font-semibold bg-gradient-to-r from-[#8B6508] via-[#B8860B] to-[#9E7409] dark:from-[#FDE68A] dark:via-[#F59E0B] dark:to-[#FBBF24] bg-clip-text text-transparent">
                Minal's Art Corner
              </span>
            </NavLink>
          )}
          <button
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className={`p-2 rounded-lg hover:bg-[#EAE2D7] dark:hover:bg-stone-800 transition-colors ${isSidebarCollapsed ? 'ml-auto' : 'ml-2'}`}
            aria-label={isSidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            {isSidebarCollapsed ? <ChevronRight className="w-5 h-5 text-[#1C1917] dark:text-[#FAF7F5]" /> : <ChevronLeft className="w-5 h-5 text-[#1C1917] dark:text-[#FAF7F5]" />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-1" role="navigation" aria-label="Main navigation">
          {navItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <NavLink
                key={item.href}
                to={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  isActive ? 'bg-amber-500/10 dark:bg-amber-400/10 text-[#8B6508] dark:text-[#F3E5AB]' : 'text-[#1C1917] dark:text-[#FAF7F5] hover:bg-[#EAE2D7] dark:hover:bg-stone-800'
                } ${isSidebarCollapsed ? 'justify-center' : ''}`}
                title={isSidebarCollapsed ? item.label : undefined}
                aria-current={isActive ? 'page' : undefined}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                {!isSidebarCollapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>

        {/* Admin Info */}
        {!isSidebarCollapsed && (
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#EAE2D7] dark:border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#8B6508] to-[#B8860B] flex items-center justify-center">
                <span className="text-white font-medium">{admin?.name?.charAt(0) || 'A'}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-[#1C1917] dark:text-[#FAF7F5] truncate">{admin?.name}</p>
                <p className="text-xs text-[#57534E] dark:text-[#A8A29E] truncate">{admin?.email}</p>
              </div>
              <button onClick={handleLogout} className="p-2 rounded-lg hover:bg-[#EAE2D7] dark:hover:bg-stone-800 text-[#57534E] dark:text-[#A8A29E] transition-colors" aria-label="Logout">
                <LogOut className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </div>
        )}
      </aside>

      {/* Header */}
      <header className={`fixed top-0 right-0 h-16 bg-white dark:bg-[#1C1C21] border-b border-[#EAE2D7] dark:border-stone-800 z-40 transition-all duration-300 ${isSidebarCollapsed ? 'left-20' : 'lg:left-64'}`}>
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-[#EAE2D7] dark:hover:bg-stone-800" aria-label={isSidebarOpen ? 'Close menu' : 'Open menu'}>
              {isSidebarOpen ? <X className="w-6 h-6 text-[#1C1917] dark:text-[#FAF7F5]" /> : <Menu className="w-6 h-6 text-[#1C1917] dark:text-[#FAF7F5]" />}
            </button>
            <h1 className="font-heading text-xl font-semibold text-[#1C1917] dark:text-[#FAF7F5]">
              {navItems.find(item => item.href === location.pathname)?.label || 'Dashboard'}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <a href="/" target="_blank" rel="noopener noreferrer" className="hidden sm:flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-[#8B6508] dark:text-[#F3E5AB] bg-amber-500/10 dark:bg-amber-400/10 rounded-full hover:bg-amber-500/20 dark:hover:bg-amber-400/20 transition-colors">
              <Sun className="w-4 h-4" aria-hidden="true" />
              View Site
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={`pt-16 min-h-screen transition-all duration-300 ${isSidebarCollapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <div className="p-6 lg:p-8">
          {children}
        </div>
      </main>
    </div>
  );
};