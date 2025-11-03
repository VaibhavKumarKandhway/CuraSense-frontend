import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import Skeleton from 'react-loading-skeleton';
import { ThemeProvider } from './providers/ThemeProvider';
import Sidebar from './components/Sidebar';
import MainDashboard from './components/MainDashboard';
import Assistant from './components/Assistant';
import './styles/assistant.css';

const LoadingFallback = () => (
  <div style={{ padding: '20px' }}>
    <Skeleton count={5} />
  </div>
);

const ErrorFallback = ({ error }) => (
  <div className="error-state">
    <h2>Something went wrong</h2>
    <pre>{error.message}</pre>
    <button onClick={() => window.location.reload()}>Try again</button>
  </div>
);

export default function App() {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <ThemeProvider>
        <div className="app-root">
          <Suspense fallback={<LoadingFallback />}>
            <Sidebar />
            <MainDashboard />
            <Assistant />
          </Suspense>
        </div>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
