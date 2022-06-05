import User from "../../../models/user.model";

export const createUserAccount = async (data: object) => {
    try {
        const user = await User.create({ ...data });

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}