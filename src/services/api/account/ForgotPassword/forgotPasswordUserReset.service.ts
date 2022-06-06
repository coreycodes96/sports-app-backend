import User, { User as UserI } from "../../../../models/user.model";
import bcrypt from "bcryptjs";

export const forgotPasswordUserReset = async (email: string, password: string): Promise<string> => {
    try {
        const hashedPassword = await bcrypt.hash(password, 12);

        const user: UserI = await User.findOne({ email }, 'password');

        user.password = hashedPassword;

        await User.findByIdAndUpdate(user._id, user, { new: true });

        return 'password reset';
    } catch (error: any) {
        throw new Error(error);
    }
}