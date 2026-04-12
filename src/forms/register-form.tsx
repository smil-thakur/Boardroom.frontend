import z from "zod";

export const RegisterFormSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(1, "Username is required")
      .min(4, "Username must be 4 characters long")
      .max(10, "Username must not exceed 10 characters"),
    email: z.email().min(1, "Email id is required"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(10, "Password must be 10 characters long")
      .max(25, "Password can not exceed 25 characters")
      .regex(/[A-Z]/, "Password should contain at least one uppercase letter")
      .regex(/[a-z]/, "Password should contain at least one lowercase letter")
      .regex(
        /[$!@#%^&*]/,
        "Password should contain at least one speacial charater (!, @, #, $, %, ^, &, 8)",
      )
      .regex(/[0-9]/, "Password should contain at least one number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords does not match",
    path: ["confirmPassword"],
  });

export type RegisterFormValues = z.infer<typeof RegisterFormSchema>;
