import { useState, useEffect } from 'react';

export const useTutorial = (appId: string) => {
  const [showWelcome, setShowWelcome] = useState(false);
  const [showTutorial, setShowTutorial] = useState(false);
  const [hasSeenTutorial, setHasSeenTutorial] = useState(false);

  useEffect(() => {
    // Check if user has seen this app's tutorial before
    const seenTutorials = JSON.parse(localStorage.getItem('mathlearn-tutorials-seen') || '[]');
    const hasSeen = seenTutorials.includes(appId);
    
    setHasSeenTutorial(hasSeen);
    
    // Show welcome prompt if not seen before
    if (!hasSeen) {
      setShowWelcome(true);
    }
  }, [appId]);

  const acceptTutorial = () => {
    setShowWelcome(false);
    setShowTutorial(true);
  };

  const declineTutorial = () => {
    setShowWelcome(false);
    markTutorialAsSeen();
  };

  const closeTutorial = () => {
    setShowTutorial(false);
    markTutorialAsSeen();
  };

  const openTutorial = () => {
    setShowTutorial(true);
  };

  const markTutorialAsSeen = () => {
    const seenTutorials = JSON.parse(localStorage.getItem('mathlearn-tutorials-seen') || '[]');
    if (!seenTutorials.includes(appId)) {
      seenTutorials.push(appId);
      localStorage.setItem('mathlearn-tutorials-seen', JSON.stringify(seenTutorials));
    }
    setHasSeenTutorial(true);
  };

  return {
    showWelcome,
    showTutorial,
    hasSeenTutorial,
    acceptTutorial,
    declineTutorial,
    closeTutorial,
    openTutorial
  };
};