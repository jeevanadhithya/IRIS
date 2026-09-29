import { Component, ReactNode } from "react";
import { Button } from "@/components/ui/button";

type Props = { children: ReactNode };
type State = { hasError: boolean; error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  state: State = { hasError: false };

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: unknown) {
    console.error("Unhandled UI error", { error, errorInfo });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-background">
          <div className="bg-card border border-border rounded-xl p-6 shadow-lg w-full max-w-md text-center">
            <p className="text-lg font-semibold">Something went wrong</p>
            <p className="text-sm text-muted-foreground mt-2">Unable to render this view. Please try again.</p>
            <div className="mt-4 flex justify-center">
              <Button onClick={() => this.setState({ hasError: false, error: undefined })}>Retry</Button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

