import { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';
import { AuthProvider } from './hooks/AuthContext';
import { RouterProvider } from './hooks/searchContext';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <BrowserRouter>
      <Suspense>
        <AuthProvider>
          <RouterProvider>
            <App />
          </RouterProvider>
        </AuthProvider>
      </Suspense>
    </BrowserRouter>
  </HelmetProvider>
);
