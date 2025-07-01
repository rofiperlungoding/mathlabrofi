import { useState, useEffect } from 'react';
import { UserProgress } from '../types';

const defaultProgress: UserProgress = {
  completedLessons: [],
  currentStreak: 0,
  totalXP: 0,
  level: 1,
};

export const useProgress = () => {
  const [progress, setProgress] = useState<UserProgress>(defaultProgress);

  useEffect(() => {
    const savedProgress = localStorage.getItem('mathlearn-progress');
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
  }, []);

  const saveProgress = (newProgress: UserProgress) => {
    setProgress(newProgress);
    localStorage.setItem('mathlearn-progress', JSON.stringify(newProgress));
  };

  const completeLesson = (lessonId: string, score: number) => {
    const newProgress = {
      ...progress,
      completedLessons: [...progress.completedLessons, lessonId],
      totalXP: progress.totalXP + score,
      level: Math.floor((progress.totalXP + score) / 100) + 1,
      currentStreak: progress.currentStreak + 1,
    };
    saveProgress(newProgress);
  };

  const isLessonCompleted = (lessonId: string) => {
    return progress.completedLessons.includes(lessonId);
  };

  return {
    progress,
    completeLesson,
    isLessonCompleted,
  };
};