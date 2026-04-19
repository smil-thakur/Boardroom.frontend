import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mail, Loader2, LogOut } from "lucide-react";
import { useState } from "react";
import { sendEmailVerification, signOut } from "firebase/auth";
import { auth } from "@/firebase/intialize-firebase";
import { toast } from "sonner";

interface VerificationDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const VerificationDialog = ({ isOpen, onClose }: VerificationDialogProps) => {
  const [isResending, setIsResending] = useState(false);
  const user = auth.currentUser;

  const handleResend = async () => {
    if (!user) return;
    setIsResending(true);
    try {
      await sendEmailVerification(user);
      toast.success("Identity Check", {
        description: "Verification email sent! Check your inbox (and spam folder).",
      });
    } catch (err) {
      console.error(err);
      toast.error("Process Failed", {
        description: "Could not send verification email. Try again later.",
      });
    } finally {
      setIsResending(false);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleLogout()}>
      <DialogContent className="sm:max-w-md border-none bg-card shadow-2xl rounded-3xl p-8">
        <DialogHeader className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-primary/10 text-primary animate-pulse">
            <Mail size={48} strokeWidth={1.5} />
          </div>
          <DialogTitle className="text-2xl font-bold tracking-tight text-center">
            Verify your email
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground text-md max-w-[280px]">
            We've sent a link to <span className="text-foreground font-medium font-mono">{user?.email}</span>. Please verify your identity to access the Boardroom.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="flex flex-col sm:flex-col gap-3 mt-6">
          <Button 
            className="w-full py-6 text-lg font-semibold rounded-2xl shadow-lg transition-all active:scale-95"
            onClick={handleResend}
            disabled={isResending}
          >
            {isResending ? (
              <Loader2 className="animate-spin mr-2" />
            ) : (
              "Resend verification link"
            )}
          </Button>
          
          <Button 
            variant="ghost" 
            className="w-full text-muted-foreground hover:bg-transparent hover:text-foreground flex gap-2"
            onClick={handleLogout}
          >
            <LogOut size={16} />
            Login with another account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default VerificationDialog;
