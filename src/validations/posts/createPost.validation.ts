import { z } from "zod";

export const createPostValidation = (data: object): { status: boolean, data: object | null } => {
    const Post = z.object({
        type: z.string({
            required_error: "Type is required"
        })
            .trim()
            .min(1, "Please select a type"),
        title: z.string({
            required_error: "Title is required",
        })
            .trim()
            .min(1, 'Please enter a title')
            .max(25, 'Your title can\'t be more than 25 characters'),
        description: z.string({
            required_error: "Description is required",
        })
            .trim()
            .min(1, 'Please enter a description')
            .max(150, 'Your description can\'t be more than 150 characters'),
    });

    try {
        Post.parse(data);

        return { status: false, data: null };
    } catch (e: any) {
        if (e instanceof z.ZodError) {
            return { status: true, data: e.flatten().fieldErrors };
        }

        throw new Error(e);
    }
}