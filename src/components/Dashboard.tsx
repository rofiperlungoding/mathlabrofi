import React from 'react';
import { Link } from 'react-router-dom';
import { mathTopics } from '../data/mathTopics';
import { TopicCard } from './TopicCard';
import { useProgress } from '../hooks/useProgress';
import { ProgressRing } from './ProgressRing';
import { BookOpen, Target, Grid3X3 } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const { progress } = useProgress();
  
  const totalLessons = mathTopics.reduce((sum, topic) => sum + topic.lessons.length, 0);
  const completedLessons = progress.completedLessons.length;
  const overallProgress = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  const quickActions = [
    {
      title: 'Mathematical Apps',
      description: '20 interactive tools',
      icon: Grid3X3,
      path: '/apps',
      highlighted: true
    },
    {
      title: 'Formula Reference',
      description: 'Complete library',
      icon: BookOpen,
      path: '/formulas'
    },
    {
      title: 'Practice Problems',
      description: 'Skill building',
      icon: Target,
      path: '/practice'
    }
  ];

  return (
    <div className="container-main section-padding space-section">
      {/* Welcome Section */}
      <div className="space-component">
        <div className="space-element">
          <h1 className="text-display mb-3">
            Welcome back
          </h1>
          <p className="text-subtitle max-w-2xl">
            Continue your mathematical journey with interactive lessons and tools
          </p>
        </div>
        
        {/* Stats Cards - Clean */}
        <div className="grid-stats">
          <div className="card card-elevated p-6">
            <div className="flex items-center justify-between mb-4">
              <div className="text-caption uppercase tracking-wide">Progress</div>
              <ProgressRing progress={overallProgress} size={40} />
            </div>
            <div className="text-2xl font-medium text-neutral-900 dark:text-white mb-1">
              {completedLessons}/{totalLessons}
            </div>
            <div className="text-caption">lessons completed</div>
          </div>
          
          <div className="card card-elevated p-6">
            <div className="text-caption uppercase tracking-wide mb-4">Experience</div>
            <div className="text-2xl font-medium text-neutral-900 dark:text-white mb-1">{progress.totalXP}</div>
            <div className="text-caption">points earned</div>
          </div>
          
          <div className="card card-elevated p-6">
            <div className="text-caption uppercase tracking-wide mb-4">Streak</div>
            <div className="text-2xl font-medium text-neutral-900 dark:text-white mb-1">{progress.currentStreak}</div>
            <div className="text-caption">days active</div>
          </div>
          
          <div className="card card-elevated p-6">
            <div className="text-caption uppercase tracking-wide mb-4">Level</div>
            <div className="text-2xl font-medium text-neutral-900 dark:text-white mb-1">{progress.level}</div>
            <div className="text-caption">current level</div>
          </div>
        </div>
      </div>

      {/* Quick Access */}
      <div className="space-component">
        <div className="text-title mb-8">Quick Access</div>
        <div className="grid-cards">
          {quickActions.map((action, index) => {
            const IconComponent = action.icon;
            return (
              <Link
                key={index}
                to={action.path}
                className={`card card-hover p-8 text-left group transition-all duration-300 ${
                  action.highlighted ? 'border-neutral-900 dark:border-neutral-100' : ''
                }`}
              >
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                    action.highlighted 
                      ? 'bg-neutral-900 dark:bg-neutral-100' 
                      : 'bg-neutral-100 dark:bg-neutral-800'
                  } group-hover:scale-105 transition-transform duration-200`}>
                    <IconComponent 
                      className={action.highlighted 
                        ? 'text-white dark:text-neutral-900' 
                        : 'text-neutral-600 dark:text-neutral-400'} 
                      size={24} 
                    />
                  </div>
                  {action.highlighted && (
                    <span className="bg-neutral-900 dark:bg-neutral-100 text-white dark:text-neutral-900 text-xs px-3 py-1 rounded-full">
                      NEW
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-medium text-neutral-900 dark:text-white mb-2 group-hover:text-neutral-700 dark:group-hover:text-neutral-300 transition-colors">
                  {action.title}
                </h3>
                <p className="text-body">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Learning Paths */}
      <div className="space-component">
        <div className="text-title mb-8">Learning Paths</div>
        <div className="grid-cards">
          {mathTopics.map((topic) => (
            <TopicCard 
              key={topic.id} 
              topic={topic}
              path={`/topics/${topic.id}`}
            />
          ))}
        </div>
      </div>
      
      {/* Recent Activity */}
      <div className="card card-elevated p-8">
        <h3 className="text-title mb-6">Recent Activity</h3>
        <div className="space-tight">
          {progress.completedLessons.slice(-3).map((lessonId, index) => (
            <div key={index} className="flex items-center gap-4 py-4 border-b border-neutral-100 dark:border-neutral-800 last:border-0">
              <div className="status-dot status-active"></div>
              <span className="text-body flex-1">Completed lesson: {lessonId}</span>
              <span className="text-caption">Recently</span>
            </div>
          ))}
          {progress.completedLessons.length === 0 && (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-neutral-100 dark:bg-neutral-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen size={24} className="text-neutral-400 dark:text-neutral-600" />
              </div>
              <p className="text-body">Start your learning journey by selecting a topic above</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};