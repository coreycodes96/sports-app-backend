import User from "../../models/user.model";
import bcrypt from "bcryptjs";

export const isPassword = async (username: string, password: string): Promise<boolean> => {
    try {
        const user = await User.findOne({ username }, 'password');
        const doesPasswordExist = await bcrypt.compare(password, user!.password);

        return doesPasswordExist;
    } catch (error: any) {
        throw new Error(error);
    }
}