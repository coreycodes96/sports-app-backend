import { Request, Response } from "express";
import { forgotPasswordVerifyValidation } from "../../../../validations/account/forgotPasswordVerify.validation";
import { isEmail } from "../../../../utils/user/isEmail";
import User, { User as UserI } from "../../../../models/user.model";
import { forgotPasswordUserVerify } from "../../../../services/api/account/ForgotPassword/forgotPasswordUserVerify.service";

export const forgotPasswordVerify = async (req: Request, res: Response): Promise<Response> => {
    const { email, code } = req.body;

    try {
        //Validation
        const validation = forgotPasswordVerifyValidation(req.body);
        if (validation.status === true) return res.status(422).json(validation.data);

        //Check if email exists
        if (!await isEmail(email)) return res.status(422).json({ email: `The email ${email} does not exist` });

        //Verify forgot password
        const user: UserI = await User.findOne({ email }, 'forgotPasswordCode');
        if (user.forgotPasswordCode !== code) return res.status(422).json({ code: "Your password does not match" });

        //Update forgot password
        await forgotPasswordUserVerify(email, code);

        return res.status(202).json({ message: "forgot password code has been successfully verified" });
    } catch (error: any) {
        throw new Error(error);
    }
}