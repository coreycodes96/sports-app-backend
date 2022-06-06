import { z } from "zod";

export const activateAccountValidation = (data: object): { status: boolean, data: object | null } => {
    const User = z.object({
        email: z.string({
            required_error: "Email is required",
        })
            .email('Not a valid email')
            .min(1, 'Please enter a email')
            .max(255, 'Your email can\'t be more than 255 characters'),
        code: z.number()
            .positive()
            .gte(1, "Please enter your code")
            .lte(6, 'Your code can\'t be more than 6 digits')
            .or(
                z.string()
                    .min(1, 'Please enter your code')
                    .max(6, 'Your code can\'t be more than 6 digits')
            )
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