import { Request, Response } from "express";
import { activateAccountValidation } from "../../../../validations/account/activateAccount.validation";
import { isEmail } from "../../../../utils/user/isEmail";
import User from "../../../../models/user.model";
import { activateUserAccount } from "../../../../services/api/account/ActivateAccount/activateUserAccount.service";

export const activateAccount = async (req: Request, res: Response): Promise<Response> => {
    const { email, code } = req.body;

    try {
        //Validation
        const validation = activateAccountValidation(req.body);
        if (validation.status === true) return res.status(422).json(validation.data);

        //Check if email exists
        if (!await isEmail(email)) return res.status(422).json({ email: `The email ${email} does not exist` });

        //Check if code matches
        const user: any = await User.findOne({ email }, 'activationCode');
        if (user.activationCode !== code) return res.status(422).json({ code: "Code is incorrect" });

        //Activate Account
        await activateUserAccount(email);

        return res.status(202).json({ message: "Your account has been successfully activated" });
    } catch (error: any) {
        throw new Error(error);
    }
}