import { Request, Response } from "express";
import { createPostValidation } from "../../../../../validations/posts/createPost.validation";
import { addPost } from "../../../../../services/api/user/Posts/AddPost/addPost.service";

export const createPost = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = res.locals.user;

    try {
        //Validations
        const validation = createPostValidation(req.body);
        if (validation.status === true) return res.status(422).json(validation.data);

        //Create post
        const post = await addPost(_id, req.body);

        return res.status(201).json(post);
    } catch (error: any) {
        throw new Error(error);
    }
}