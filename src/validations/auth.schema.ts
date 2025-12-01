import * as z from "zod";

const signUpSchema = z.object({
    username: z.string().min(1, "Username is required"),
    email: z.string().email("Invalid email"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmPassword: z.string(),
})
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

const signInSchema = z.object({
    username: z.string().min(1, "username is required"),
    password: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
});

const changePasswordSchema = z.object({
    oldPassword: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    newPassword: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
    confirmNewPassword: z.string()
        .min(6, "Password must be at least 6 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character")
}).refine((data) => data.newPassword == data.confirmNewPassword, {
    path: ["confirmNewPassword"],
    message: "Password and Confirm Password is not matched"

});

const deleteBookSchema = z.object({
    bookId: z.string().min(1, "BookId is required")
})

export {
    signUpSchema,
    signInSchema,
    changePasswordSchema,
    deleteBookSchema
}