import { Request, Response } from "express";
import { createAccountValidation } from "../../../../validations/account/createAccount.validation";
import { isUsername } from "../../../../utils/user/isUsername";
import { isEmail } from "../../../../utils/user/isEmail";
import { generateCode } from "../../../../utils/helpers/generateCode";
import { createUserAccount } from "../../../../services/api/account/CreateAccount/createAccount.service";
import activateEmail from "../../../../emails/activateAccountEmail";

export const createAccount = async (req: Request, res: Response): Promise<Response> => {
    const { firstname, surname, username, email, dob, password } = req.body;

    try {
        //Validations
        const validation = createAccountValidation(req.body);
        if (validation.status === true) return res.status(422).json(validation.data);

        //Check if username already exists
        if (await isUsername(username)) return res.status(422).json({ username: `The username ${username} has already been taken` });

        //Check if email already exists
        if (await isEmail(email)) return res.status(422).json({ email: `The email ${email} has already been taken` });

        const code = generateCode();

        //Creating the users account
        const user = await createUserAccount({
            firstname,
            surname,
            username,
            email,
            dob,
            password,
        }, code);

        //Send an email
        await activateEmail(email, code);

        return res.status(200).json(user);
    } catch (error: any) {
        throw new Error(error);
    }
}