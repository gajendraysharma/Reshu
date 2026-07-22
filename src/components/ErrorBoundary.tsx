import React, { Component, ErrorInfo, ReactNode } from 'react';
import { RotateCcw, AlertTriangle } from 'lucide-react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  private handleReset = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
      window.location.reload();
    }
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#0a1128] text-white flex items-center justify-center p-6 font-sans">
          <div className="max-w-md w-full bg-[#152238] border border-amber-500/30 rounded-2xl p-8 text-center shadow-2xl">
            <div className="w-14 h-14 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center mx-auto mb-5">
              <AlertTriangle className="w-7 h-7 text-amber-400" />
            </div>
            <h2 className="text-xl font-black tracking-tight text-white mb-2">
              Assessment Engine Notice
            </h2>
            <p className="text-slate-300 text-xs leading-relaxed mb-6">
              A temporary display glitch occurred. Please click below to refresh and re-enter your assessment seamlessly.
            </p>
            <button
              onClick={this.handleReset}
              className="w-full py-3 px-5 bg-gradient-to-r from-[#d4af37] to-[#b38f25] hover:brightness-110 text-white text-xs font-extrabold uppercase tracking-wider rounded-xl shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Reload Assessment</span>
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
