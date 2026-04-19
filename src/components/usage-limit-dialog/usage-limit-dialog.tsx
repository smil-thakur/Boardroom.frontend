import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Lock, Rocket, Sparkles } from "lucide-react";

interface UsageLimitDialogProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
}

const UsageLimitDialog: React.FC<UsageLimitDialogProps> = ({ 
  isOpen, 
  onClose,
  title = "Free Tier Exhausted",
  description = "Paid tiers will be available soon! Stay tuned for unlimited creative power."
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md overflow-hidden rounded-3xl border border-border bg-card p-8 shadow-2xl"
          >
            {/* Background Sparkle Decor */}
            <div className="absolute top-0 right-0 -m-4 h-24 w-24 bg-primary/20 blur-3xl rounded-full" />
            <div className="absolute bottom-0 left-0 -m-4 h-24 w-24 bg-primary/10 blur-3xl rounded-full" />

            <div className="relative flex flex-col items-center text-center">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <Lock size={32} />
              </div>
              
              <h2 className="mb-2 text-2xl font-bold tracking-tight text-foreground">
                {title}
              </h2>
              
              <p className="mb-8 text-muted-foreground">
                {description}
              </p>

              <div className="grid w-full grid-cols-1 gap-3">
                <Button 
                  onClick={onClose} 
                  className="w-full rounded-2xl h-12 text-md font-semibold bg-primary hover:bg-primary/90 transition-all"
                >
                  <Sparkles className="mr-2" size={18} /> Join the Waitlist
                </Button>
                <Button 
                  variant="ghost" 
                  onClick={onClose} 
                  className="w-full h-10 text-muted-foreground hover:text-foreground"
                >
                  Close
                </Button>
              </div>

              <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted-foreground/60 font-medium">
                <Rocket size={10} /> Powered by Boardroom Pro
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default UsageLimitDialog;
