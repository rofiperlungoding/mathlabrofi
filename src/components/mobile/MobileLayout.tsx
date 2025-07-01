import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Book, Target, Calculator, Menu, X, Search,
  MessageSquare, ChevronRight, Moon, Sun
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { ThemeToggle } from '../ThemeToggle';

interface MobileLayoutProps {
  children: React.ReactNode;
  hideNav?: boolean;
  title?: string;
}

export const MobileLayout: React.FC<MobileLayoutProps> = ({ 
  children, 
  hideNav = false,
  title
}) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  
  const getPageTitle = () => {
    if (title) return title;
    
    const path = location.pathname;
    if (path === '/') return "Rofi's Mathlab";
    if (path.startsWith('/apps')) return "Apps";
    if (path.startsWith('/formulas')) return "Formulas";
    if (path.startsWith('/practice')) {
      if (path === '/practice') return "Practice";
      const category = path.split('/').pop();
      return category ? `${category.charAt(0).toUpperCase() + category.slice(1)}` : "Practice";
    }
    if (path.startsWith('/topics')) return "Topics";
    
    return "Rofi's Mathlab";
  };
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Calculator, label: 'Apps', path: '/apps' },
    { icon: Book, label: 'Formulas', path: '/formulas' },
    { icon: Target, label: 'Practice', path: '/practice' },
  ];
  
  // Is this path active
  const isActive = (path: string) => {
    if (path === '/') return location.pathname === '/';
    return location.pathname.startsWith(path);
  };
  
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-900">
      {/* Simplified Header */}
      <header className="bg-white dark:bg-neutral-800 border-b border-neutral-200 dark:border-neutral-700 sticky top-0 z-30 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {location.pathname !== '/' && (
              <button 
                onClick={() => navigate(-1)}
                className="w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-300"
                aria-label="Go back"
              >
                ←
              </button>
            )}
            <h1 className="text-lg font-medium text-neutral-900 dark:text-white truncate">
              {getPageTitle()}
            </h1>
          </div>
          
          <div className="flex items-center gap-2">
            {/* Theme Toggle */}
            <ThemeToggle variant="minimal" className="w-8 h-8" />
            
            <button 
              onClick={() => navigate('/search')}
              className="w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-300"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <button 
              onClick={() => setMenuOpen(true)}
              className="w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-300"
              aria-label="Open menu"
            >
              <Menu size={20} />
            </button>
          </div>
        </div>
      </header>
      
      {/* Main Content Area - Added pb-16 to account for the fixed navbar */}
      <main className="flex-1 pb-16">
        {children}
      </main>
      
      {/* Mobile Navigation */}
      {!hideNav && (
        <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700 z-30 h-16 bottom-nav">
          <div className="grid grid-cols-4 h-full">
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex flex-col items-center justify-center h-full transition-colors ${
                  isActive(item.path) 
                    ? 'text-blue-600 dark:text-blue-400' 
                    : 'text-neutral-400 dark:text-neutral-500'
                }`}
              >
                <item.icon size={20} />
                <span className="text-xs mt-1">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      )}
      
      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 ${
        menuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}>
        <div className={`absolute top-0 bottom-0 right-0 w-3/4 max-w-xs bg-white dark:bg-neutral-800 transition-transform duration-300 ${
          menuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          {/* Menu Header */}
          <div className="p-4 border-b border-neutral-200 dark:border-neutral-700 flex items-center justify-between">
            <h2 className="font-medium text-lg text-neutral-900 dark:text-white">Menu</h2>
            <button 
              onClick={() => setMenuOpen(false)}
              className="w-8 h-8 flex items-center justify-center text-neutral-500 dark:text-neutral-300 rounded-full hover:bg-neutral-100 dark:hover:bg-neutral-700"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Menu Items */}
          <div className="p-2">
            <ul className="space-y-1">
              {navItems.map((item) => (
                <li key={item.label}>
                  <button
                    onClick={() => {
                      navigate(item.path);
                      setMenuOpen(false);
                    }}
                    className={`w-full flex items-center px-4 py-3 rounded-lg ${
                      isActive(item.path)
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700'
                    }`}
                  >
                    <item.icon size={20} className="mr-3" />
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Theme Toggle */}
          <div className="border-t border-neutral-200 dark:border-neutral-700 mt-2 p-2">
            <button
              onClick={toggleTheme}
              className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
            >
              <div className="flex items-center">
                {theme === 'dark' ? (
                  <Moon size={20} className="mr-3 text-blue-400" />
                ) : (
                  <Sun size={20} className="mr-3 text-yellow-500" />
                )}
                <span>Theme</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-neutral-500 dark:text-neutral-400">
                  {theme === 'dark' ? 'Dark' : 'Light'}
                </span>
                <div className={`w-10 h-5 rounded-full relative ${
                  theme === 'dark' ? 'bg-blue-500' : 'bg-neutral-300'
                }`}>
                  <div className={`absolute w-4 h-4 rounded-full bg-white top-0.5 transition-transform ${
                    theme === 'dark' ? 'translate-x-5' : 'translate-x-0.5'
                  }`}></div>
                </div>
              </div>
            </button>
          </div>
          
          {/* Secondary Menu Items */}
          <div className="border-t border-neutral-200 dark:border-neutral-700 mt-2 p-2">
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => {
                    window.location.href = 'mailto:opikopi32@gmail.com?subject=Rofi%27s%20Mathlab%20Feedback';
                    setMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-700"
                >
                  <div className="flex items-center">
                    <MessageSquare size={20} className="mr-3" />
                    <span>Send Feedback</span>
                  </div>
                  <ChevronRight size={16} className="text-neutral-400 dark:text-neutral-500" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};