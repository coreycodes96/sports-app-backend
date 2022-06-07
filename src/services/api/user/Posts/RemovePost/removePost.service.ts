import Post from "../../../../../models/post.model";

export const removePost = async (id: string): Promise<string> => {
    try {
        await Post.findByIdAndDelete(id);

        return 'Post successfully deleted';
    } catch (error: any) {
        throw new Error(error);
    }
}