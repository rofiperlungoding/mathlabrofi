import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import { MobileLayout } from './MobileLayout';
import { MobileCard } from './MobileCard';
import { MobileStats } from './MobileStats';
import { ActionButton } from './ActionButton';
import { mathTopics } from '../../data/mathTopics';
import { Trophy, Target, Book, Calculator, Grid, CheckCircle, BarChart, Settings, Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { MobileThemeTutorial } from './MobileThemeTutorial';

export const MobileDashboard: React.FC = () => {
  const { progress } = useProgress();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [showThemeTutorial, setShowThemeTutorial] = useState(false);
  
  const totalLessons = mathTopics.reduce((sum, topic) => sum + topic.lessons.length, 0);
  const completedLessons = progress.completedLessons.length;

  // Quick action cards
  const quickActions = [
    {
      title: 'Practice',
      description: 'Skill-building exercises',
      icon: <div className="w-10 h-10 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600 dark:text-purple-400">
        <Target size={20} />
      </div>,
      path: '/practice'
    },
    {
      title: 'Apps',
      description: '20 interactive tools',
      icon: <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 dark:text-green-400">
        <Calculator size={20} />
      </div>,
      path: '/apps'
    },
    {
      title: 'Formulas',
      description: 'Quick reference',
      icon: <div className="w-10 h-10 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
        <Book size={20} />
      </div>,
      path: '/formulas'
    }
  ];

  return (
    <MobileLayout>
      {/* Tutorial overlay */}
      {showThemeTutorial && (
        <MobileThemeTutorial onClose={() => setShowThemeTutorial(false)} />
      )}
      
      {/* Header with stats */}
      <div className="p-4 bg-white dark:bg-neutral-800 shadow-sm mb-2">
        <h2 className="text-sm font-medium text-neutral-500 dark:text-neutral-400 mb-3">
          Your Progress
        </h2>
        
        <MobileStats 
          items={[
            { value: completedLessons, label: 'Lessons', icon: <CheckCircle size={16} className="text-green-500" /> },
            { value: progress.level, label: 'Level', icon: <BarChart size={16} className="text-blue-500" /> },
            { value: progress.totalXP, label: 'XP', icon: <Trophy size={16} className="text-yellow-500" /> },
            { value: progress.currentStreak, label: 'Streak', icon: <Target size={16} className="text-red-500" /> }
          ]}
          compact
        />
      </div>
      
      {/* Settings and Theme Quick Access */}
      <div className="px-4 mb-4">
        <div className="flex gap-2">
          <button
            onClick={() => navigate('/settings')}
            className="flex-1 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center gap-2 text-neutral-700 dark:text-neutral-300 text-sm"
          >
            <Settings size={16} />
            Settings
          </button>
          
          <button
            onClick={() => setShowThemeTutorial(true)}
            className="flex-1 p-2 bg-neutral-100 dark:bg-neutral-800 rounded-lg flex items-center justify-center gap-2 text-neutral-700 dark:text-neutral-300 text-sm"
          >
            {theme === 'dark' ? (
              <>
                <Moon size={16} className="text-blue-500 dark:text-blue-400" />
                Dark Mode
              </>
            ) : (
              <>
                <Sun size={16} className="text-yellow-500" />
                Light Mode
              </>
            )}
          </button>
        </div>
      </div>
      
      {/* Quick Actions */}
      <div className="p-4">
        <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-3">
          Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 gap-3">
          {quickActions.map((action, index) => (
            <MobileCard
              key={index}
              title={action.title}
              description={action.description}
              icon={action.icon}
              onClick={() => navigate(action.path)}
            />
          ))}
        </div>
      </div>
      
      {/* Continue Learning */}
      <div className="p-4 border-t-8 border-neutral-100 dark:border-neutral-800">
        <h2 className="text-lg font-medium text-neutral-900 dark:text-white mb-3">
          Continue Learning
        </h2>
        
        {progress.completedLessons.length > 0 ? (
          <div className="relative bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 mb-4">
            <div className="absolute top-0 left-0 h-1 bg-green-500 dark:bg-green-600" style={{ width: '65%' }}></div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-blue-600 dark:text-blue-400">
                <Book size={24} />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-neutral-900 dark:text-white text-base">Algebra Fundamentals</h3>
                <p className="text-sm text-neutral-600 dark:text-neutral-400">65% complete</p>
              </div>
            </div>
            <div className="mt-3">
              <ActionButton 
                label="Continue" 
                color="primary" 
                size="sm" 
                fullWidth
                onClick={() => navigate('/topics/algebra')}
              />
            </div>
          </div>
        ) : (
          <div className="bg-white dark:bg-neutral-800 rounded-xl border border-neutral-200 dark:border-neutral-700 p-6 flex flex-col items-center mb-4">
            <Book size={32} className="text-neutral-400 dark:text-neutral-500 mb-2" />
            <p className="text-neutral-600 dark:text-neutral-400 text-center text-sm">
              You haven't started any lessons yet.
            </p>
          </div>
        )}
      </div>
      
      {/* Learning Paths - Reduced bottom padding to avoid excessive scroll */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-lg font-medium text-neutral-900 dark:text-white">
            Learning Paths
          </h2>
          <button className="text-sm text-blue-600 dark:text-blue-400">
            See all
          </button>
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          {mathTopics.slice(0, 3).map((topic, index) => (
            <MobileCard
              key={index}
              title={topic.title}
              description={topic.description}
              icon={
                <div className={`w-10 h-10 rounded-lg ${topic.color} flex items-center justify-center text-white`}>
                  <Grid size={20} />
                </div>
              }
              badge={topic.difficulty}
              onClick={() => navigate(`/topics/${topic.id}`)}
            />
          ))}
        </div>
      </div>
    </MobileLayout>
  );
};