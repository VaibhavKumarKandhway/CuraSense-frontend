import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from 'react-router-dom';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

export const Providers = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        {children}
        <Toaster 
          position="top-right"
          toastOptions={{
            success: {
              className: 'toast-success',
              duration: 4000,
            },
            error: {
              className: 'toast-error',
              duration: 6000,
            },
          }}
        />
      </BrowserRouter>
    </QueryClientProvider>
  );
};