import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { PracticeStateProvider } from './context/PracticeStateContext';
import { ThemeTransition } from './components/ThemeTransition';

// Mobile components
import { MobileDashboard } from './components/mobile/MobileDashboard';
import { MobilePractice } from './components/mobile/MobilePractice';
import { MobileFormulaReference } from './components/mobile/MobileFormulaReference';
import { MobileApps } from './components/mobile/MobileApps';
import { MobileTopicView } from './components/mobile/MobileTopicView';
import { MobileLessonView } from './components/mobile/MobileLessonView';
import { MobileAppDetail } from './components/mobile/MobileAppDetail';
import { MobileCategoryPractice } from './components/mobile/MobileCategoryPractice';
import { MobileSettings } from './components/mobile/MobileSettings';
import { MobileThemeTutorial } from './components/mobile/MobileThemeTutorial';

// Import mobile styles
import './styles/mobile.css';

function MobileApp() {
  const [showThemeTutorial, setShowThemeTutorial] = useState(false);
  
  useEffect(() => {
    // Check if the user has seen the theme tutorial
    const hasSeenThemeTutorial = localStorage.getItem('theme-tutorial-seen');
    if (!hasSeenThemeTutorial) {
      // Wait a short delay before showing tutorial for better UX
      const timer = setTimeout(() => {
        setShowThemeTutorial(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  const handleCloseTutorial = () => {
    setShowThemeTutorial(false);
    localStorage.setItem('theme-tutorial-seen', 'true');
  };

  return (
    <BrowserRouter>
      <ThemeProvider>
        <PracticeStateProvider>
          <ThemeTransition />
          <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 gpu-accelerate">
            {showThemeTutorial && (
              <MobileThemeTutorial onClose={handleCloseTutorial} />
            )}
            
            <Routes>
              {/* Dashboard */}
              <Route path="/" element={<MobileDashboard />} />

              {/* Practice */}
              <Route path="/practice" element={<MobilePractice />} />
              <Route path="/practice/:category" element={<MobileCategoryPractice />} />

              {/* Topics & Lessons */}
              <Route path="/topics/:topicId" element={<MobileTopicView />} />
              <Route path="/topics/:topicId/lessons/:lessonId" element={<MobileLessonView />} />

              {/* Formulas */}
              <Route path="/formulas" element={<MobileFormulaReference />} />

              {/* Apps */}
              <Route path="/apps" element={<MobileApps />} />
              <Route path="/apps/:appId" element={<MobileAppDetail />} />
              
              {/* Settings */}
              <Route path="/settings" element={<MobileSettings />} />

              {/* Redirect any other routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </PracticeStateProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default MobileApp;