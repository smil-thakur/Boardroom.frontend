import React from "react";
import { useDebateStore } from "@/stores/debate-store";
import { Button } from "@/components/ui/button";
import { AlertCircle } from "lucide-react";

const ErrorDialog: React.FC = () => {
  const error = useDebateStore((state) => state.error);
  const setError = useDebateStore((state) => state.setError);

  if (!error) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-card border border-border shadow-2xl rounded-xl p-8 max-w-md w-full mx-4 animate-in zoom-in-95 duration-300">
        <div className="flex flex-col items-center text-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold tracking-tight">Boardroom Error</h2>
            <p className="text-muted-foreground text-sm leading-relaxed">
              {error}
            </p>
          </div>

          <Button 
            className="w-full mt-2" 
            variant="destructive"
            onClick={() => setError(null)}
          >
            Acknowledge
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ErrorDialog;
