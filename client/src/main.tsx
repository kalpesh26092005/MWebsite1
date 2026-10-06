import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { Toaster } from 'react-hot-toast';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { ProductProvider } from './context/ProductContext';
import './styles/globals.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ThemeProvider>
          <AuthProvider>
            <ProductProvider>
              <App />
              <Toaster
                position="top-right"
                toastOptions={{
                  duration: 4000,
                  style: {
                    background: '#2D2D2D',
                    color: '#FFF8F0',
                    borderRadius: '12px',
                    padding: '16px',
                  },
                  success: {
                    iconTheme: {
                      primary: '#B8860B',
                      secondary: '#FFF8F0',
                    },
                  },
                  error: {
                    iconTheme: {
                      primary: '#C41E3A',
                      secondary: '#FFF8F0',
                    },
                  },
                }}
              />
            </ProductProvider>
          </AuthProvider>
        </ThemeProvider>
      </BrowserRouter>
    </HelmetProvider>
  </React.StrictMode>
);