import User, { User as UserI } from "../../../../models/user.model";

export const activateUserAccount = async (email: string): Promise<string> => {
    try {
        const user: UserI = await User.findOne({ email }, '_id activationCode isActivated');

        user.isActivated = true;
        user.activationCode = null;

        await User.findByIdAndUpdate(user._id, user, { new: true });

        return 'account activated';
    } catch (error: any) {
        throw new Error(error);
    }
}