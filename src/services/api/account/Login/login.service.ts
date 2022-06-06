import User from "../../../../models/user.model";

export const loginUser = async (username: string): Promise<any> => {
    try {
        const user = await User.findOne({ username });

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}