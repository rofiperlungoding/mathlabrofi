import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useProgress } from '../../hooks/useProgress';
import { Target, Trophy, Clock, Sparkles, Zap, ArrowRight } from 'lucide-react';
import { usePracticeState } from '../../context/PracticeStateContext';
import { PracticeCategoryCard } from './PracticeCategoryCard';
import { Breadcrumbs } from '../ui/Breadcrumbs';
import { categoryData } from '../../data/practiceCategories';

export const PracticeExercises: React.FC = () => {
  const { progress } = useProgress();
  const { sessionScore, exercisesCompleted, sessionStartTime } = usePracticeState();
  const navigate = useNavigate();

  // Get session duration
  const getSessionDuration = (): string => {
    if (!sessionStartTime) return '0m';
    const now = new Date();
    const diffMs = now.getTime() - sessionStartTime.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    return diffMins < 60 ? `${diffMins}m` : `${Math.floor(diffMins / 60)}h ${diffMins % 60}m`;
  };

  // Calculate accuracy
  const getAccuracy = (): number => {
    if (exercisesCompleted === 0) return 0;
    return Math.round((sessionScore / (exercisesCompleted * 100)) * 100);
  };

  return (
    <div className="container-main section-padding">
      <div className="space-component">
        {/* Page title with breadcrumbs */}
        <Breadcrumbs
          items={[
            { label: 'Home', path: '/' },
            { label: 'Practice', path: '/practice', active: true }
          ]}
          className="mb-8"
        />

        {/* Main Title */}
        <div className="text-center space-element mb-8">
          <h2 className="text-display mb-4 flex items-center justify-center gap-3">
            <Target className="text-accent dark:text-blue-400" />
            Practice Exercises
          </h2>
          <p className="text-subtitle max-w-2xl mx-auto">
            Strengthen your mathematical skills with targeted practice problems
          </p>
        </div>

        {/* Session Stats */}
        <div className="px-4 mb-16">
          <div className="grid-stats">
            <div className="card card-elevated p-6">
              <div className="text-caption uppercase tracking-wide mb-4">Points</div>
              <div className="text-2xl font-medium text-neutral-900 dark:text-white mb-1">{sessionScore}</div>
              <div className="text-caption">points earned</div>
            </div>
            
            <div className="card card-elevated p-6">
              <div className="text-caption uppercase tracking-wide mb-4">Completed</div>
              <div className="text-2xl font-medium text-neutral-900 dark:text-white mb-1">{exercisesCompleted}</div>
              <div className="text-caption">exercises done</div>
            </div>
            
            <div className="card card-elevated p-6">
              <div className="text-caption uppercase tracking-wide mb-4">Accuracy</div>
              <div className="text-2xl font-medium text-neutral-900 dark:text-white mb-1">{getAccuracy()}%</div>
              <div className="text-caption">success rate</div>
            </div>
            
            <div className="card card-elevated p-6">
              <div className="text-caption uppercase tracking-wide mb-4">Duration</div>
              <div className="text-2xl font-medium text-neutral-900 dark:text-white mb-1">{getSessionDuration()}</div>
              <div className="text-caption">time active</div>
            </div>
          </div>
        </div>
      </div>

      {/* Practice Categories */}
      <div className="mb-16">
        <h3 className="text-xl font-semibold text-primary dark:text-white mb-8 flex items-center gap-2">
          <Sparkles className="text-purple-500" size={20} />
          Choose a Practice Category
        </h3>
        
        <div className="grid grid-cols-1 tablet:grid-cols-2 desktop:grid-cols-3 gap-6">
          {categoryData.map(category => (
            <PracticeCategoryCard
              key={category.id}
              category={category}
              onClick={() => navigate(`/practice/${category.id}`)}
            />
          ))}
        </div>
      </div>

      {/* Quick Start Section */}
      <div className="card p-8 mb-12 bg-gradient-to-r from-accent/5 to-purple-100/50 dark:from-blue-900/20 dark:to-purple-900/20 border border-accent/20 dark:border-blue-800/30">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-16 h-16 bg-accent dark:bg-blue-600 rounded-full flex items-center justify-center text-white text-2xl">
            <Zap size={32} />
          </div>
          
          <div className="flex-1">
            <h4 className="text-xl font-semibold text-neutral-900 dark:text-white mb-2 text-center md:text-left">
              Quick Practice Session
            </h4>
            <p className="text-neutral-600 dark:text-neutral-300 mb-4 max-w-xl text-center md:text-left">
              Want to jump right in? Start an adaptive practice session with mixed problems tailored to your skill level.
            </p>
            <div className="flex flex-wrap gap-3 justify-center md:justify-start">
              <button 
                onClick={() => navigate('/practice/mixed')} 
                className="btn btn-primary flex items-center gap-2"
              >
                <Target size={16} />
                Start Mixed Practice
              </button>
              <Link to="/practice/challenge" className="btn btn-secondary flex items-center gap-2">
                <Trophy size={16} />
                Daily Challenge
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Recent & Recommended Practice */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-primary dark:text-white flex items-center gap-2">
            <Clock size={20} className="text-green-500" />
            Recent & Recommended
          </h3>
        </div>
        
        <div className="grid grid-cols-1 tablet:grid-cols-3 gap-4">
          {categoryData.slice(0, 3).map((category) => (
            <div key={category.id} className="card p-4 hover:shadow-md dark:hover:shadow-black/20 transition-all cursor-pointer">
              <div className="flex items-center gap-3 mb-3">
                <div className={`w-10 h-10 flex items-center justify-center rounded-lg text-white text-xl ${category.color}`}>
                  {category.icon}
                </div>
                <div>
                  <h4 className="font-medium text-neutral-900 dark:text-white">{category.name}</h4>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400">{category.problemCount} exercises</p>
                </div>
              </div>
              
              <div className="text-sm text-neutral-700 dark:text-neutral-300 line-clamp-2 mb-3">
                {category.description}
              </div>
              
              <Link 
                to={`/practice/${category.id}`}
                className="w-full text-center text-xs font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 py-2 border-t border-neutral-100 dark:border-neutral-700 flex items-center justify-center gap-1"
              >
                Practice Now
                <ArrowRight size={12} />
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Practice Tips */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-primary dark:text-white mb-4 flex items-center gap-2">
          <Target className="text-accent" size={20} />
          Effective Practice Tips
        </h3>
        <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4 text-sm text-secondary">
          <div className="bg-blue-50/50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-100 dark:border-blue-800">
            <h4 className="font-medium text-primary dark:text-white mb-2">Daily Consistency</h4>
            <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>• Practice a little every day rather than cramming</li>
              <li>• Focus on understanding over memorization</li>
              <li>• Build a habit with scheduled practice sessions</li>
            </ul>
          </div>
          <div className="bg-green-50/50 dark:bg-green-900/20 p-4 rounded-lg border border-green-100 dark:border-green-800">
            <h4 className="font-medium text-primary dark:text-white mb-2">Track Your Progress</h4>
            <ul className="space-y-1 text-neutral-700 dark:text-neutral-300">
              <li>• Review mistakes to identify patterns</li>
              <li>• Gradually increase difficulty as you improve</li>
              <li>• Celebrate your improvement and streaks</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};