import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // In production, you might want to log to an error reporting service
    if (import.meta.env.PROD) {
      // logErrorToService(error, errorInfo);
    }
  }

  private handleReload = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
          <div className="max-w-md w-full text-center">
            <div className="mb-8">
              <Icon 
                name="AlertTriangle" 
                className="h-16 w-16 text-red-500 mx-auto mb-4" 
              />
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Что-то пошло не так
              </h1>
              <p className="text-gray-600 mb-6">
                Произошла непредвиденная ошибка. Попробуйте перезагрузить страницу или вернуться на главную.
              </p>
              
              {!import.meta.env.PROD && this.state.error && (
                <details className="text-left bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <summary className="font-medium text-red-800 cursor-pointer">
                    Детали ошибки (только для разработки)
                  </summary>
                  <pre className="mt-2 text-xs text-red-700 overflow-auto">
                    {this.state.error.toString()}
                    {this.state.error.stack}
                  </pre>
                </details>
              )}
            </div>

            <div className="space-y-3">
              <Button 
                onClick={this.handleReload}
                className="w-full"
                size="lg"
              >
                <Icon name="RotateCcw" className="mr-2 h-4 w-4" />
                Перезагрузить страницу
              </Button>
              
              <Button 
                onClick={this.handleGoHome}
                variant="outline"
                className="w-full"
                size="lg"
              >
                <Icon name="Home" className="mr-2 h-4 w-4" />
                Вернуться на главную
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;