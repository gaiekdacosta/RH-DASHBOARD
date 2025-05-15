import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import { RoutesPages } from './routes';
import { Toaster } from '@/src/components/ui/toaster'
import { UserProvider } from './contexts/UserContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const rootEl = document.getElementById('root');
const queryClient = new QueryClient();

if (rootEl) {
  const root = ReactDOM.createRoot(rootEl);
  root.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <Toaster />
          <RoutesPages />
        </UserProvider>
      </QueryClientProvider>
    </React.StrictMode>,
  );
}
