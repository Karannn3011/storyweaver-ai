
import '@styles/tailwind.css';

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Toaster } from "./app/components/ui/sonner"
import { BrowserRouter } from 'react-router-dom' // Import BrowserRouter
import App from './App.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* Wrap your App component */}
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </StrictMode>,
)