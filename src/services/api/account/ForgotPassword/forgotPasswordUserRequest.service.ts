import User, { User as UserI } from "../../../../models/user.model";

export const forgotPasswordUserRequest = async (email: string, code: number): Promise<string> => {
    try {
        const user: UserI = await User.findOne({ email }, 'forgotPasswordCode');
        user.forgotPasswordCode = code;

        await User.findByIdAndUpdate(user._id, user, { new: true });

        return 'forgot password code updated';
    } catch (error: any) {
        throw new Error(error);
    }
}