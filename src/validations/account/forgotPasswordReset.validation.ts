import { z } from "zod";

export const forgotPasswordResetValidation = (data: object): { status: boolean, data: object | null } => {
    const User = z.object({
        currentPassword: z.string({
            required_error: "Password is required",
        })
            .trim()
            .min(1, 'Please enter a password')
            .max(255, 'Your password can\'t be more than 255 characters'),
        newPassword: z.string({
            required_error: "Password is required",
        })
            .trim()
            .min(1, 'Please enter a password')
            .max(255, 'Your password can\'t be more than 255 characters'),
        confirmNewPassword: z.string({
            required_error: "Confirm password is required",
        })
            .trim()
            .min(1, 'Please confirm your password'),
    }).refine((data) => data.newPassword === data.confirmNewPassword, {
        message: "Passwords do not match",
        path: ['confirmNewPassword'],
    });

    try {
        User.parse(data);

        return { status: false, data: null };
    } catch (e: any) {
        if (e instanceof z.ZodError) {
            return { status: true, data: e.flatten().fieldErrors };
        }

        throw new Error(e);
    }
}