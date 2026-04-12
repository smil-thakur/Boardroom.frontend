import z from "zod";

export const LoginFormSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Please enter password"),
});

export type LoginFormValues = z.infer<typeof LoginFormSchema>;
