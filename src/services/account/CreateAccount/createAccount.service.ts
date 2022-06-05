import User from "../../../models/user.model";

export const createUserAccount = async (data: object, code: number): Promise<object> => {
    try {
        const user = await User.create({ ...data, activationCode: code });

        return user;
    } catch (error: any) {
        throw new Error(error);
    }
}