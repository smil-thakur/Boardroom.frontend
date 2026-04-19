import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldError } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Spinner } from "@/components/ui/spinner";
import { LoginUser, LoginUserViaGoogle } from "@/firebase/login-user";
import { LoginFormSchema, type LoginFormValues } from "@/forms/login-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { auth } from "@/firebase/intialize-firebase";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router";
import VerificationDialog from "@/components/verification-dialog/verification-dialog";

const LoginScreen = () => {
  const navigate = useNavigate();

  const handleNavigateSignUp = () => {
    navigate("/register");
  };

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const [isLoggingIn, setIsLoggingIn] = useState<boolean>(false);
  const [proceedingViaGoogle, setProceedingViaGoogle] =
    useState<boolean>(false);
  const [showVerificationDialog, setShowVerificationDialog] = useState(false);

  // Check for existing unverified session on mount
  useState(() => {
    const checkVerification = () => {
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        setShowVerificationDialog(true);
      }
    };
    checkVerification();
  });

  const handleLoginUser: SubmitHandler<LoginFormValues> = async (data) => {
    setIsLoggingIn(true);
    try {
      await LoginUser(data.email, data.password);
      
      const user = auth.currentUser;
      if (user && !user.emailVerified) {
        setShowVerificationDialog(true);
      }
    } catch (err) {
      console.error("Login component error:", err);
      // Explicitly reset on catch just in case finally has issues in some edge cases
      setIsLoggingIn(false);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleProceedWithGoogle = async () => {
    try {
      setProceedingViaGoogle(true);
      await LoginUserViaGoogle();
    } catch (err) {
      console.log(err);
    } finally {
      setProceedingViaGoogle(false);
    }
  };

  return (
    <>
      <VerificationDialog 
        isOpen={showVerificationDialog} 
        onClose={() => setShowVerificationDialog(false)} 
      />
      
      <div className="content-wrapper flex items-center justify-center">
        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
            <CardAction>
              <Button
                disabled={isLoggingIn || proceedingViaGoogle}
                variant="link"
                onClick={handleNavigateSignUp}
              >
                Sign Up
              </Button>
            </CardAction>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(handleLoginUser)}>
              <div className="flex flex-col gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    {...register("email")}
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    required
                  />
                  {errors.email && (
                    <FieldError>{errors.email.message}</FieldError>
                  )}
                </div>
                <div className="grid gap-2">
                  <Input
                    {...register("password")}
                    id="password"
                    type="password"
                    required
                  />
                  {errors.password && (
                    <FieldError>{errors.password.message}</FieldError>
                  )}
                </div>
              </div>
            </form>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button
              type="submit"
              className="w-full"
              disabled={isLoggingIn || proceedingViaGoogle}
              onClick={handleSubmit(handleLoginUser)}
            >
              {isLoggingIn && <Spinner data-icon="inline-start" />}
              Login
            </Button>
            <Button
              onClick={handleProceedWithGoogle}
              disabled={isLoggingIn || proceedingViaGoogle}
              variant="outline"
              className="w-full"
            >
              {proceedingViaGoogle && <Spinner data-icon="inline-start" />}
              Proceed with Google
            </Button>
          </CardFooter>
        </Card>
      </div>
    </>
  );
};

export default LoginScreen;
