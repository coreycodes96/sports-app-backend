import User from "../../../../../models/user.model";
import Post, { Post as PostI } from "../../../../../models/post.model";

export const showPosts = async (_id: string): Promise<object> => {
    try {
        const supportedIds: string[] = await User.findById(_id, '-_id supported')
            .where('supported.status')
            .equals(0)
            .distinct('supported.user');

        supportedIds.push(_id);

        const posts: object = await Post.find({ user: { $in: supportedIds } })
            .sort({ createdAt: -1 })
            .populate('user', '_id username role blocked');

        return posts;
    } catch (error: any) {
        throw new Error(error);
    }
}