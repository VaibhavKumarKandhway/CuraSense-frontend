import React from 'react';
import { createRoot } from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import App from './App';
import { Providers } from './providers/Providers';
import './styles.css';

// Polyfill for ResizeObserver if needed
if (!window.ResizeObserver) {
  window.ResizeObserver = class ResizeObserver {
    observe() {}
    unobserve() {}
    disconnect() {}
  };
}

const ErrorFallback = () => (
  <div className="error-state" style={{ padding: '2rem' }}>
    <h2>Oops! Something went wrong</h2>
    <button 
      onClick={() => window.location.reload()}
      style={{ padding: '0.5rem 1rem', marginTop: '1rem' }}
    >
      Refresh Page
    </button>
  </div>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(
  <React.StrictMode>
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <Providers>
        <App />
      </Providers>
    </ErrorBoundary>
  </React.StrictMode>
);
