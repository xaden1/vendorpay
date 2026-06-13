import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center p-6" style={{ background: 'var(--base)' }}>
          <div className="card p-10 text-center max-w-md">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--red-glow)' }}>
              <AlertTriangle size={32} color="var(--red)" />
            </div>
            <h2 className="text-xl font-bold mb-2" style={{ color: 'var(--t1)' }}>Something went wrong</h2>
            <p className="text-sm mb-6" style={{ color: 'var(--t3)' }}>
              {this.state.error?.message || 'An unexpected error occurred'}
            </p>
            <button
              className="btn btn-primary mx-auto"
              onClick={() => window.location.reload()}
            >
              <RefreshCw size={16} />
              Reload App
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
