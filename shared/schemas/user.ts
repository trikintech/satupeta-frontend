import { z } from "zod";

export const userSchema = z
  .object({
    name: z.string().min(1),
    username: z.string().min(1),
    email: z.string().email(),
    employee_id: z.string().optional(),
    position: z.string().optional(),
    profile_picture: z.string().optional(),
    role_id: z.string().min(1),
    organization_id: z.string().min(1),
    is_active: z.boolean(),
    password: z.string().min(6, "Password minimal 6 karakter").optional(),
    confirm_password: z.string().optional(),
  })
  .refine(
    (data) => {
      if (data.password || data.confirm_password) {
        return data.password === data.confirm_password;
      }
      return true;
    },
    {
      message: "Password tidak cocok",
      path: ["confirm_password"],
    }
  );

export type UserFormValues = z.infer<typeof userSchema>;
