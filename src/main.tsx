import * as React from 'react';
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { preloadCriticalResources, loadCriticalCSS } from "./utils/css-optimizer";

// Preload critical resources
preloadCriticalResources();
loadCriticalCSS();

createRoot(document.getElementById("root")!).render(<App />);