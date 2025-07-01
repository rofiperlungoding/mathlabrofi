import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

interface BreadcrumbItem {
  label: string;
  path: string;
  active?: boolean;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`mb-4 ${className}`}>
      <ol className="flex items-center flex-wrap text-sm text-neutral-500 dark:text-neutral-400">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          
          return (
            <li key={item.path} className="flex items-center">
              {index === 0 ? (
                <Link 
                  to={item.path} 
                  className={`flex items-center hover:text-neutral-700 dark:hover:text-neutral-300 ${
                    item.active ? 'text-neutral-900 dark:text-white font-medium' : ''
                  }`}
                >
                  <Home size={14} className="mr-1" />
                  {item.label}
                </Link>
              ) : (
                <>
                  <ChevronRight size={14} className="mx-2 text-neutral-400 dark:text-neutral-500" />
                  {item.active ? (
                    <span className="text-neutral-900 dark:text-white font-medium">{item.label}</span>
                  ) : (
                    <Link 
                      to={item.path}
                      className="hover:text-neutral-700 dark:hover:text-neutral-300"
                    >
                      {item.label}
                    </Link>
                  )}
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};