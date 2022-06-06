import { Request, Response } from "express";
import { resendActivationCodeValidation } from "../../../../validations/account/resendActivationCode.validation";
import User, { User as UserI } from "../../../../models/user.model";
import { generateCode } from "../../../../utils/helpers/generateCode";
import activateEmail from "../../../../emails/activateAccountEmail";
import { resendUserActivationCode } from "../../../../services/api/account/ActivateAccount/resendUserActivationCode.service";

export const resendActivationCode = async (req: Request, res: Response): Promise<Response> => {
    const { username } = req.body;

    try {
        //Validation
        const validation = resendActivationCodeValidation(req.body);
        if (validation.status === true) return res.status(422).json(validation.data);

        //Get users email
        const user: UserI = await User.findOne({ username }, 'email');

        //Generate new code
        const code = generateCode();

        //Resend Activation code
        await resendUserActivationCode(user.email, code);

        //Send an email
        activateEmail(user.email, code);

        return res.status(202).json({ message: "activation code has been successfully sent, please check your email" });
    } catch (error: any) {
        throw new Error(error);
    }
}