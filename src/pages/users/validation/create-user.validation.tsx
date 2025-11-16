import z from "zod";

export const userCreateFormSchema = z.object({
    fullname: z
        .string()
        .min(1, { message: "Fullname is required" })
        .min(2, { message: "Fullname must be at least 2 characters" })
        .max(100, { message: "Fullname must not exceed 100 characters" }),
    email: z
        .string()
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email format" }),
    dateOfBirth: z
        .date({
            message: "Invalid date format",
        })
        .optional()
        .refine(
            (date) => {
                if (!date) return true;
                const today = new Date();
                today.setHours(0, 0, 0, 0);
                return date <= today;
            },
            { message: "Date of birth cannot be in the future" }
        )
        .refine(
            (date) => {
                if (!date) return true;
                const today = new Date();
                const minAge = new Date();
                minAge.setFullYear(today.getFullYear() - 120);
                return date >= minAge;
            },
            { message: "Date of birth is invalid" }
        ),
    password: z
        .string()
        .min(1, { message: "Password is required" })
        .min(8, { message: "Password must be at least 8 characters" })
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
            {
                message: "Password must contain at least one uppercase letter, one lowercase letter, and one number",
            }
        ),
    gender: z
        .enum(["male", "female", "other"], {
            message: "Gender is required",
        }),
    role: z
        .enum(["super_admin", "manager", "staff", "casher"], {
            message: "Role is required",
        }),
});