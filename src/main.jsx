import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import AppRoutes from './routes/appRoutes.jsx';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './context/authContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      {/* Manage Routes */}
      <AppRoutes />
      <Toaster />
    </AuthProvider>
  </StrictMode>
);
