import { Request, Response } from "express";
import User from "../../../models/user.model";
import { createUserAccount } from "../../../services/account/CreateAccount/createAccount.service";

export const createAccount = async (req: Request, res: Response): Promise<Response> => {
    const { firstname, surname, username, email, dob, password } = req.body;

    try {
        //Validations

        //Creating the users account
        const user = await createUserAccount({
            firstname,
            surname,
            username,
            email,
            dob,
            password,
        });

        return res.status(200).json(user);
    } catch (error: any) {
        throw new Error(error);
    }
}