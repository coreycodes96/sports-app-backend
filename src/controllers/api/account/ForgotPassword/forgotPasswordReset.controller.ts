import { Request, Response } from "express";
import { forgotPasswordUserRequest } from "../../../../services/api/account/ForgotPassword/forgotPasswordUserRequest.service";
import { isEmail } from "../../../../utils/user/isEmail";
import { forgotPasswordResetValidation } from "../../../../validations/account/forgotPasswordReset.validation";

export const forgotPasswordReset = async (req: Request, res: Response): Promise<Response> => {
    const { email, currentPassword } = req.body;

    try {
        //Validation
        const validation = forgotPasswordResetValidation(req.body);
        if (validation.status === true) return res.status(422).json(validation.data);

        //Check if email exists
        if (!await isEmail(email)) return res.status(422).json({ email: `The email ${email} does not exist` });

        //Change password
        await forgotPasswordUserRequest(email, currentPassword);

        return res.status(202).json({ message: "Password has been successfully changed" });
    } catch (error: any) {
        throw new Error(error);
    }
}