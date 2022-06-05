import { Request, Response, NextFunction } from 'express';
import jwt from "jsonwebtoken";
import util from "util";

import { createAccessToken } from '../utils/jwt/createAccessToken';

const verify = util.promisify(jwt.verify);

//middleware
const deserializeMiddleware = async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = (<string>req.headers["authorization"])?.split(" ")[1];
    const refreshToken = (<string>req.headers["x-refresh"])?.split(" ")[1];

    //If the access token does not exist
    if (!accessToken) return next();

    try {
        //Decoding the access token
        const decoded = await verify(accessToken);

        //Setting the data from the access token
        res.locals.user = decoded;
    } catch (error: any) {
        //If the access token is invalid
        if (error.message === "jwt expired" && refreshToken) {
            //Verifying the refresh token
            const user: { id: string, username: string } = await verify(refreshToken)
                .catch((): any =>
                    res.status(401).send("Cannot refresh token")
                );

            //Setting that access token data
            const tokenData: { id: string, username: string } = {
                'id': user.id,
                'username': user.username,
            };

            //Creating a new access token
            const accessToken = createAccessToken(tokenData);

            //Setting the new access token to the header
            res.setHeader("x-access", accessToken);

            //Setting the access token
            res.locals.user = user;

            return next();
        }
    }

    next();
};

export default deserializeMiddleware;