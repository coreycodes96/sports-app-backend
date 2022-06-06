import User, { User as UserI } from "../../../../models/user.model";

export const forgotPasswordUserVerify = async (email: string, code: number): Promise<string> => {
    try {
        const user: UserI = await User.findOne({ email }, 'forgotPasswordCode');
        user.forgotPasswordCode = null;

        await User.findByIdAndUpdate(user._id, user, { new: true });

        return 'forgot password verified';
    } catch (error: any) {
        throw new Error(error);
    }
}