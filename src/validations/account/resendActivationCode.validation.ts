import { z } from "zod";

export const resendActivationCodeValidation = (data: object): { status: boolean, data: object | null } => {
    const User = z.object({
        username: z.string({
            required_error: "Username is required",
        })
            .trim()
            .min(1, 'Please enter a username')
            .max(20, 'Your username can\'t be more than 20 characters'),
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