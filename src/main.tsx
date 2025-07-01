import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import MobileApp from './MobileApp.tsx';
import './index.css';
import './styles/responsive.css';

// Improved device detection that checks both screen width and user agent
const isMobile = () => {
  const userAgentMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  const screenMobile = window.innerWidth < 768;
  
  // Only treat as mobile if both the screen size and user agent suggest a mobile device
  // This helps avoid treating desktop browsers with small windows as mobile devices
  return screenMobile && userAgentMobile;
};

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {isMobile() ? <MobileApp /> : <App />}
  </StrictMode>
);