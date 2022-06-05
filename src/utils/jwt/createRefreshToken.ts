import jwt from 'jsonwebtoken';

//Signing the refresh token
export const createRefreshToken = (data: object) => {
    const secret: any = process.env.REFRESH_TOKEN_SECRET;

    return jwt.sign(data, secret, { expiresIn: '1yr' });
}