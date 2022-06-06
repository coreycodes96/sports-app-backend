import User from "../../models/user.model";

export const isUsername = async (username: string): Promise<boolean> => {
    try {
        const checkUsername = await User.countDocuments({ username });

        return checkUsername === 1 ? true : false;
    } catch (error: any) {
        throw new Error(error);
    }
}