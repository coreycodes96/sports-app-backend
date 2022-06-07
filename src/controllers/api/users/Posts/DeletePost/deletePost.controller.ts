import { Request, Response } from "express";
import { removePost } from "../../../../../services/api/user/Posts/RemovePost/removePost.service";

export const deletePost = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;

    try {
        //Delete post
        await removePost(id);

        return res.status(204).json({ message: "post successfully deleted" });
    } catch (error: any) {
        throw new Error(error);
    }
}