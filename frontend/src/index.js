import React from 'react';
import App from './App';
import './index.css';
import { createRoot } from 'react-dom/client';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element');
}

createRoot(rootElement).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>
);
