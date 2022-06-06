import User from "../../models/user.model";

export const isEmail = async (email: string): Promise<boolean> => {
    try {
        const checkEmail = await User.countDocuments({ email });

        return checkEmail === 1 ? true : false;
    } catch (error: any) {
        throw new Error(error);
    }
}