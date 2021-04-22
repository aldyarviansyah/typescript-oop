import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const auth = (req: Request, res: Response, next: NextFunction): any => {
    if(!req.headers.authorization){
        return res.status(401).send('unauthenticated');
    }

    let secretKey: string = process.env.JWT_SECRET_KEY || 'aldyarviansyah@gmail.com';
    const token: string = req.headers.authorization.split(" ")[1];

    try {
        jwt.verify(token, secretKey, (err: any, decoded: any) => {
            if (err){
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            req.app.locals.credential = decoded;
            next();
        });
    } catch (error: any) {
        return res.status(401).send(error);
    }
}