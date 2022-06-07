import Post, { Post as PostI } from "../../../../../models/post.model";

export const addPost = async (_id: string, data: object): Promise<object> => {
    try {
        const post: PostI = await Post.create({ ...data, user: _id });
        await post.populate('user', '_id username role blocked');

        return post;
    } catch (error: any) {
        throw new Error(error);
    }
}