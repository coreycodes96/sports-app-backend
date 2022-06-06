import { Request, Response } from "express";
import { isUsername } from "../../../../utils/user/isUsername";
import { isPassword } from "../../../../utils/user/isPassword";
import { loginValidation } from "../../../../validations/account/login.validation";
import { loginUser } from "../../../../services/api/account/Login/login.service";
import { LoginData } from "../../../../interfaces/api/account/login.interfaces";
import { createRefreshToken } from "../../../../utils/jwt/createRefreshToken";
import { createAccessToken } from "../../../../utils/jwt/createAccessToken";

export const login = async (req: Request, res: Response): Promise<Response> => {
    const { username, password } = req.body;

    try {
        //Validation
        const validation = loginValidation(req.body);
        if (validation.status === true) return res.status(422).json(validation.data);

        //Check if username exists
        if (await isUsername(username)) return res.status(422).json({ email: `The username ${username} does not exist` });

        //Check if the password is valid
        if (!await isPassword(username, password)) return res.status(403).json({ password: "Your password is incorrect" });

        //Login user
        const user = await loginUser(username);

        const data: LoginData = {
            _id: user._id,
            firstname: user.firstname,
            surname: user.surname,
            username: user.username,
            email: user.email,
            dob: user.dob,
            interests: user.interests,
            blocked: user.blocked,
            favourites: user.favourites,
            favouriting: user.favouriting,
        };

        //Create tokens
        const refreshToken = createRefreshToken(data);
        const accessToken = createAccessToken(data);

        return res.status(200).json({ ...data, refreshToken, accessToken })
    } catch (error: any) {
        throw new Error(error);
    }
}