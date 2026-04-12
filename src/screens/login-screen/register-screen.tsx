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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { FieldError } from "@/components/ui/field";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  RegisterFormSchema,
  type RegisterFormValues,
} from "@/forms/register-form";
import { useState } from "react";
import { CreateUser } from "@/firebase/create-user";
import { Spinner } from "@/components/ui/spinner";
import { LoginUser, LoginUserViaGoogle } from "@/firebase/login-user";

const RegisterScreen = () => {
  const navigate = useNavigate();
  const handleLoginNavigate = () => {
    navigate("/login");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(RegisterFormSchema),
    defaultValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [registeringUser, setRegisteringUser] = useState<boolean>(false);
  const [proceedingViaGoogle, setProceedingViaGoogle] =
    useState<boolean>(false);

  const onSubmit: SubmitHandler<RegisterFormValues> = async (data) => {
    setRegisteringUser(true);
    try {
      await CreateUser(data.username, data.email, data.password);
      await LoginUser(data.email, data.password);
    } catch (err) {
      console.error(err);
    } finally {
      setRegisteringUser(false);
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
    <div className="content-wrapper flex items-center justify-center">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to register a new account
          </CardDescription>
          <CardAction>
            <Button
              variant="link"
              disabled={registeringUser || proceedingViaGoogle}
              onClick={handleLoginNavigate}
            >
              Already have an account? Login
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  {...register("username")}
                  id="name"
                  type="text"
                  placeholder="Your Name"
                  required
                />
                {errors.username && (
                  <FieldError>{errors.username.message}</FieldError>
                )}
              </div>
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
                <Label htmlFor="password">Password</Label>
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
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  {...register("confirmPassword")}
                  id="confirm-password"
                  type="password"
                  required
                />
                {errors.confirmPassword && (
                  <FieldError>{errors.confirmPassword.message}</FieldError>
                )}
              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            className="w-full"
            onClick={handleSubmit(onSubmit)}
            disabled={registeringUser || proceedingViaGoogle}
          >
            {registeringUser && <Spinner data-icon="inline-start" />}
            Register
          </Button>
          <Button
            disabled={registeringUser || proceedingViaGoogle}
            variant="outline"
            className="w-full"
            onClick={handleProceedWithGoogle}
          >
            {proceedingViaGoogle && <Spinner data-icon="inline-start" />}
            Proceed with Google
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default RegisterScreen;
