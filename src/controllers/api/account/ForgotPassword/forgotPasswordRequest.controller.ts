import { Request, Response } from "express";
import { forgotPasswordRequestValidation } from "../../../../validations/account/forgotPasswordRequest.validation";
import { isEmail } from "../../../../utils/user/isEmail";
import forgotPasswordEmail from "../../../../emails/forgotPasswordEmail";
import { generateCode } from "../../../../utils/helpers/generateCode";
import { forgotPasswordUserRequest } from "../../../../services/api/account/ForgotPassword/forgotPasswordUserRequest.service";

export const forgotPasswordRequest = async (req: Request, res: Response): Promise<Response> => {
    const { email } = req.body;

    try {
        //Validation
        const validation = forgotPasswordRequestValidation(req.body);
        if (validation.status === true) return res.status(422).json(validation.data);

        //Check if email exists
        if (!await isEmail(email)) return res.status(422).json({ email: `The email ${email} does not exist.` });

        //Generate code
        const code = generateCode();

        //Request forgot password
        await forgotPasswordUserRequest(email, code);

        //Send an email
        forgotPasswordEmail(email, code);

        return res.status(202).json({ message: "Request to change password was successful please check your email" });
    } catch (error: any) {
        throw new Error(error);
    }
}