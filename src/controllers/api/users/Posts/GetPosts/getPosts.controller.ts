import { Request, Response } from "express";
import { showPosts } from "../../../../../services/api/user/Posts/ShowPosts/showPosts.service";

export const getPosts = async (req: Request, res: Response): Promise<Response> => {
    const { _id } = res.locals.user;

    try {
        //Get posts
        const posts: object = await showPosts(_id);

        return res.status(200).json(posts);
    } catch (error: any) {
        throw new Error(error);
    }
}