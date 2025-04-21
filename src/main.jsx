// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.jsx';
import './index.css';
import './App.css';

// Import Font Awesome
import '@fortawesome/fontawesome-free/css/all.min.css';

// Get the root element
const root = document.getElementById('root');

// Create a root
const reactRoot = createRoot(root);

// Render the app
reactRoot.render(
  <StrictMode>
    <BrowserRouter>
      <HelmetProvider>
        <App />
      </HelmetProvider>
    </BrowserRouter>
  </StrictMode>,
);