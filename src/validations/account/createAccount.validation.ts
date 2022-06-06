import { z } from "zod";

export const createAccountValidation = (data: object): { status: boolean, data: object | null } => {
    const User = z.object({
        firstname: z.string({
            required_error: "Firstname is required",
        })
            .trim()
            .min(1, 'Please enter your firstname')
            .max(25, 'Your firstname can\'t be more than 25 characters'),
        surname: z.string({
            required_error: "Surname is required",
        })
            .trim()
            .min(1, 'Please enter your surname')
            .max(25, 'Your surname can\'t be more than 25 characters'),
        username: z.string({
            required_error: "Username is required",
        })
            .trim()
            .min(1, 'Please enter a username')
            .max(20, 'Your username can\'t be more than 20 characters'),
        email: z.string({
            required_error: "Email is required",
        })
            .trim()
            .min(1, 'Please enter your email')
            .max(255, 'Your email can\'t be more than 255 characters')
            .email('Not a valid email'),
        dob: z.string({
            required_error: "Date of birth is required",
        })
            .trim()
            .min(1, 'Please enter your date of birth'),
        password: z.string({
            required_error: "Password is required",
        })
            .trim()
            .min(1, 'Please enter a password')
            .max(255, 'Your password can\'t be more than 255 characters'),
        confirmPassword: z.string({
            required_error: "confirm password is required",
        })
            .trim()
            .min(1, 'Please confirm your password'),
        interests: z.array(z.any()).min(1, 'Please add 1 or more interests'),
    }).refine((data) => data.password === data.confirmPassword, {
        message: "Passwords do not match",
        path: ['confirmPassword'],
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