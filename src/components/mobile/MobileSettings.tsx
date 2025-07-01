import React, { useState } from 'react';
import { MobileLayout } from './MobileLayout';
import { MobileCard } from './MobileCard';
import { MobileThemeSelector } from './MobileThemeSelector';
import { useTheme } from '../../context/ThemeContext';
import { 
  Moon, 
  Sun, 
  BookOpen, 
  BellRing,
  Languages,
  Palette, 
  HelpCircle, 
  Shield, 
  RefreshCcw, 
  ChevronRight 
} from 'lucide-react';

export const MobileSettings: React.FC = () => {
  const { theme } = useTheme();
  const [showThemeSelector, setShowThemeSelector] = useState(false);
  
  // Demo settings that would typically connect to actual app functionality
  const settingsSections = [
    {
      title: 'Appearance',
      settings: [
        {
          id: 'theme',
          name: 'Theme',
          description: 'Light or dark appearance',
          icon: theme === 'dark' ? Moon : Sun,
          iconColorClass: theme === 'dark' ? 'text-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400' : 'text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400',
          value: theme === 'dark' ? 'Dark' : 'Light',
          onClick: () => setShowThemeSelector(true)
        },
        {
          id: 'text-size',
          name: 'Text Size',
          description: 'Adjust reading experience',
          icon: BookOpen,
          iconColorClass: 'text-green-500 bg-green-100 dark:bg-green-900/30 dark:text-green-400',
          value: 'Medium'
        }
      ]
    },
    {
      title: 'App Preferences',
      settings: [
        {
          id: 'notifications',
          name: 'Notifications',
          description: 'Reminders and updates',
          icon: BellRing,
          iconColorClass: 'text-red-500 bg-red-100 dark:bg-red-900/30 dark:text-red-400',
          value: 'On'
        },
        {
          id: 'language',
          name: 'Language',
          description: 'Display language',
          icon: Languages,
          iconColorClass: 'text-purple-500 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400',
          value: 'English'
        }
      ]
    },
    {
      title: 'Help & Support',
      settings: [
        {
          id: 'tutorials',
          name: 'Tutorials',
          description: 'Learn how to use the app',
          icon: HelpCircle,
          iconColorClass: 'text-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400'
        },
        {
          id: 'about',
          name: 'About',
          description: 'Version and legal information',
          icon: Shield,
          iconColorClass: 'text-neutral-500 bg-neutral-100 dark:bg-neutral-800 dark:text-neutral-400'
        }
      ]
    }
  ];

  const resetAppData = () => {
    if (window.confirm('Are you sure you want to reset all app data? This cannot be undone.')) {
      // Would typically clear localStorage, etc.
      alert('App data has been reset.');
    }
  };
  
  if (showThemeSelector) {
    return (
      <MobileLayout title="Theme">
        <MobileThemeSelector />
      </MobileLayout>
    );
  }

  return (
    <MobileLayout title="Settings">
      {settingsSections.map((section, sectionIndex) => (
        <div key={sectionIndex} className="px-4 py-3">
          <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
            {section.title}
          </h2>
          <div className="space-y-2">
            {section.settings.map((setting) => (
              <MobileCard
                key={setting.id}
                title={setting.name}
                description={setting.description}
                icon={
                  <div className={`w-10 h-10 rounded-lg ${setting.iconColorClass} flex items-center justify-center`}>
                    <setting.icon size={20} />
                  </div>
                }
                rightContent={
                  <div className="flex items-center gap-2">
                    {setting.value && (
                      <span className="text-sm text-neutral-500 dark:text-neutral-400">
                        {setting.value}
                      </span>
                    )}
                    <ChevronRight size={18} className="text-neutral-400 dark:text-neutral-500" />
                  </div>
                }
                onClick={setting.onClick}
              />
            ))}
          </div>
        </div>
      ))}
      
      {/* Advanced Actions */}
      <div className="px-4 py-3">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-2">
          Advanced
        </h2>
        <div className="space-y-2">
          <MobileCard
            title="Reset App Data"
            description="Clear all data and start fresh"
            icon={
              <div className="w-10 h-10 rounded-lg text-red-500 dark:text-red-400 bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <RefreshCcw size={20} />
              </div>
            }
            onClick={resetAppData}
          />
        </div>
      </div>
      
      <div className="p-4 mt-4 text-center">
        <p className="text-xs text-neutral-500 dark:text-neutral-500">
          Version 1.0.0
        </p>
        <p className="text-xs text-neutral-400 dark:text-neutral-600 mt-1">
          © 2025 Rofi's Mathlab
        </p>
      </div>
    </MobileLayout>
  );
};