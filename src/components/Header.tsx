import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useProgress } from '../hooks/useProgress';
import { BookOpen, Menu, ArrowLeft, MessageSquare, Home } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { ThemeToggle } from './ThemeToggle';
import { mathTopics } from '../data/mathTopics';

interface HeaderProps {
  onBackClick?: () => void;
  title?: string;
}

export const Header: React.FC<HeaderProps> = ({ 
  onBackClick, 
  title 
}) => {
  const { progress } = useProgress();
  const { theme } = useTheme();
  const location = useLocation();
  const navigate = useNavigate();

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', path: '/' },
    { id: 'apps', label: 'Apps', path: '/apps' },
    { id: 'formulas', label: 'Formulas', path: '/formulas' },
    { id: 'practice', label: 'Practice', path: '/practice' }
  ];

  const handleFeedbackClick = () => {
    window.location.href = 'mailto:opikopi32@gmail.com?subject=Rofi%27s%20Mathlab%20Feedback';
  };

  // Get current page title
  const getPageTitle = () => {
    if (title) return title;
    
    const path = location.pathname;
    
    // Check for practice category pages
    if (path.startsWith('/practice/')) {
      const category = path.split('/').pop();
      return `${category?.charAt(0).toUpperCase()}${category?.slice(1)} Practice`;
    }
    
    // Check for topic pages
    if (path.startsWith('/topics/')) {
      const topicId = path.split('/')[2];
      const topic = mathTopics.find(t => t.id === topicId);
      
      if (path.includes('/lessons/')) {
        const lessonId = path.split('/').pop();
        const lesson = topic?.lessons.find(l => l.id === lessonId);
        return lesson?.title || 'Lesson';
      }
      
      return topic?.title || 'Topic';
    }
    
    // Default titles for main sections
    const pageTitles: Record<string, string> = {
      '/': "Rofi's Mathlab",
      '/apps': "Mathematical Apps",
      '/formulas': "Formula Reference",
      '/practice': "Practice Exercises"
    };
    
    return pageTitles[path] || "Rofi's Mathlab";
  };
  
  // Get back navigation handler
  const getBackNavigation = () => {
    const path = location.pathname;
    
    if (path.startsWith('/practice/')) {
      return '/practice';
    }
    
    if (path.startsWith('/topics/')) {
      if (path.includes('/lessons/')) {
        return `/topics/${path.split('/')[2]}`;
      }
      return '/';
    }
    
    // For main sections, go back to home
    if (path === '/apps' || path === '/formulas' || path === '/practice') {
      return '/';
    }
    
    return null;
  };

  const backPath = getBackNavigation();

  return (
    <header className="backdrop-minimal border-b border-neutral-200 dark:border-neutral-800 sticky top-0 z-40 gpu-accelerate">
      <div className="container-main py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center">
                <img
                  src="/R.png"
                  alt="Rofi's Mathlab Logo"
                  className={`w-14 h-14 rounded-2xl logo-transition ${theme === 'dark' ? 'invert' : ''}`}
                />
              </Link>
              <div className="flex items-center gap-3">
                <h1 className="text-title theme-aware">
                  {getPageTitle()}
                </h1>
                {backPath && (
                  <Link
                    to={backPath}
                    className="p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-colors focus-ring flex items-center gap-2 text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white theme-aware"
                    aria-label="Go back"
                  >
                    <ArrowLeft size={16} />
                    <span className="text-sm">Back</span>
                  </Link>
                )}
              </div>
            </div>
          </div>
          
          {/* Navigation Menu - Desktop */}
          <nav className="hidden md:flex items-center gap-2">
            {navigationItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`nav-item ${location.pathname === item.path ? 'nav-item-active' : ''} theme-aware`}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          
          {/* User Profile & Stats */}
          <div className="flex items-center gap-4">
            {/* Theme Toggle */}
            <ThemeToggle variant="fancy" />

            {/* Feedback Button */}
            <button
              onClick={handleFeedbackClick}
              className="hidden sm:flex items-center gap-2 text-sm text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white py-2 px-3 bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 rounded-lg transition-all duration-200 theme-aware"
            >
              <MessageSquare size={14} />
              <span>Feedback</span>
            </button>

            {/* Stats - Desktop */}
            <div className="hidden sm:flex items-center gap-6 text-caption theme-aware">
              <div className="flex items-center gap-2">
                <div className="status-dot status-active"></div>
                <span>{progress.currentStreak}d</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen size={16} className="text-neutral-400 dark:text-neutral-500" />
                <span>{progress.totalXP}</span>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden p-2 hover:bg-neutral-100 dark:hover:bg-neutral-800 rounded-xl transition-all duration-200">
              <Menu size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <nav className="md:hidden mt-6 flex overflow-x-auto gap-2 pb-2">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              to={item.path}
              className={`nav-item whitespace-nowrap ${location.pathname === item.path ? 'nav-item-active' : ''}`}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Mobile Feedback Button */}
          <button
            onClick={handleFeedbackClick}
            className="nav-item whitespace-nowrap flex items-center gap-2"
          >
            <MessageSquare size={14} />
            <span>Feedback</span>
          </button>
        </nav>

        {/* Breadcrumb Navigation - New */}
        {location.pathname !== '/' && (
          <div className="mt-3 flex items-center text-sm text-neutral-500 dark:text-neutral-400 overflow-x-auto pb-1">
            <Link to="/" className="hover:text-neutral-700 dark:hover:text-neutral-300 flex items-center">
              <Home size={14} className="mr-1" />
              Home
            </Link>
            
            {location.pathname.startsWith('/practice') && (
              <>
                <span className="mx-2">/</span>
                <Link to="/practice" className={`hover:text-neutral-700 dark:hover:text-neutral-300 ${location.pathname === '/practice' ? 'text-neutral-900 dark:text-white font-medium' : ''}`}>
                  Practice
                </Link>
                
                {location.pathname.split('/').length > 2 && (
                  <>
                    <span className="mx-2">/</span>
                    <span className="text-neutral-900 dark:text-white font-medium capitalize">
                      {location.pathname.split('/').pop()}
                    </span>
                  </>
                )}
              </>
            )}
            
            {location.pathname.startsWith('/topics') && (
              <>
                <span className="mx-2">/</span>
                <span className="hover:text-neutral-700 dark:hover:text-neutral-300">Topics</span>
                
                {location.pathname.split('/').length > 2 && (
                  <>
                    <span className="mx-2">/</span>
                    <span className="text-neutral-900 dark:text-white font-medium capitalize">
                      {location.pathname.split('/')[2]}
                    </span>
                  </>
                )}
                
                {location.pathname.includes('/lessons/') && (
                  <>
                    <span className="mx-2">/</span>
                    <span className="text-neutral-900 dark:text-white font-medium">
                      Lesson: {location.pathname.split('/').pop()}
                    </span>
                  </>
                )}
              </>
            )}
            
            {['/apps', '/formulas'].includes(location.pathname) && (
              <>
                <span className="mx-2">/</span>
                <span className="text-neutral-900 dark:text-white font-medium">
                  {location.pathname === '/apps' && 'Apps'}
                  {location.pathname === '/formulas' && 'Formulas'}
                </span>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};