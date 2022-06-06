import User, { User as UserI } from "../../../../models/user.model";

export const resendUserActivationCode = async (email: string, code: number): Promise<void> => {
    try {
        const user: UserI = await User.findOne({ email }, 'activationCode');
        user.activationCode = code;

        await User.findByIdAndUpdate(user._id, user, { new: true });

        return;
    } catch (error: any) {
        throw new Error(error);
    }
}