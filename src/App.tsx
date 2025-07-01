import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TopicOverview } from './components/TopicOverview';
import { LessonView } from './components/LessonView';
import { FormulaReference } from './components/FormulaReference';
import { PracticeExercises } from './components/practice/PracticeExercises';
import { CategoryPracticePage } from './components/practice/CategoryPracticePage';
import { Apps } from './components/Apps';
import { ThemeProvider } from './context/ThemeContext';
import { ThemeTransition } from './components/ThemeTransition';
import { mathTopics } from './data/mathTopics';
import { PracticeStateProvider } from './context/PracticeStateContext';

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <PracticeStateProvider>
          <ThemeTransition />
          <div className="min-h-screen bg-neutral-50 dark:bg-neutral-900 gpu-accelerate">
            <Routes>
              {/* Dashboard */}
              <Route
                path="/"
                element={
                  <>
                    <Header title="Rofi's Mathlab" />
                    <main className="pb-8 dark:text-white gpu-accelerate">
                      <Dashboard />
                    </main>
                  </>
                }
              />

              {/* Topics */}
              <Route
                path="/topics/:topicId"
                element={
                  <>
                    <Header />
                    <main className="pb-8 dark:text-white gpu-accelerate">
                      <TopicOverviewWrapper />
                    </main>
                  </>
                }
              />

              {/* Lessons */}
              <Route
                path="/topics/:topicId/lessons/:lessonId"
                element={
                  <>
                    <Header />
                    <main className="pb-8 dark:text-white gpu-accelerate">
                      <LessonViewWrapper />
                    </main>
                  </>
                }
              />

              {/* Formulas */}
              <Route
                path="/formulas"
                element={
                  <>
                    <Header title="Formula Reference" />
                    <main className="pb-8 dark:text-white gpu-accelerate">
                      <div className="container-spacing py-8">
                        <FormulaReference />
                      </div>
                    </main>
                  </>
                }
              />

              {/* Practice */}
              <Route
                path="/practice"
                element={
                  <>
                    <Header title="Practice Exercises" />
                    <main className="pb-8 dark:text-white gpu-accelerate">
                      <div className="container-spacing py-8">
                        <PracticeExercises />
                      </div>
                    </main>
                  </>
                }
              />

              {/* Category-specific Practice Pages */}
              <Route
                path="/practice/:category"
                element={
                  <>
                    <Header />
                    <main className="pb-8 dark:text-white gpu-accelerate">
                      <div className="container-spacing py-8">
                        <CategoryPracticePage />
                      </div>
                    </main>
                  </>
                }
              />

              {/* Apps */}
              <Route
                path="/apps"
                element={
                  <>
                    <Header title="Mathematical Apps" />
                    <main className="pb-8 dark:text-white gpu-accelerate">
                      <div className="container-spacing py-8">
                        <Apps />
                      </div>
                    </main>
                  </>
                }
              />

              {/* Redirect any other routes to home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </PracticeStateProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

// Wrapper components that handle route parameters
const TopicOverviewWrapper = () => {
  const params = new URL(window.location.href).pathname.split('/');
  const topicId = params[params.length - 1];
  const topic = mathTopics.find(t => t.id === topicId);
  
  if (!topic) {
    return <Navigate to="/" replace />;
  }
  
  return <TopicOverview topic={topic} onLessonSelect={(lessonId) => {
    window.location.href = `/topics/${topicId}/lessons/${lessonId}`;
  }} />;
};

const LessonViewWrapper = () => {
  const params = new URL(window.location.href).pathname.split('/');
  const lessonId = params[params.length - 1];
  const topicId = params[params.length - 3];
  
  const topic = mathTopics.find(t => t.id === topicId);
  const lesson = topic?.lessons.find(l => l.id === lessonId);
  
  if (!lesson) {
    return <Navigate to={`/topics/${topicId}`} replace />;
  }
  
  return <LessonView lesson={lesson} onComplete={() => {
    window.location.href = `/topics/${topicId}`;
  }} />;
};

export default App;