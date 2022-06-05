import { Request, Response, NextFunction } from 'express';

const protectUser = (req: Request, res: Response, next: NextFunction): any => {
    const user: {} = res.locals.user;

    //If the user does not exist
    if (!user) return res.status(401).json('Unauthorized');
    next();
};

export default protectUser;