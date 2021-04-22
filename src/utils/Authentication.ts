import argon2 from 'argon2';
import jwt from 'jsonwebtoken';

class Authentication {
    public static hash = (password: string): Promise<string> => {
        return argon2.hash(password);
    }

    public static verify = (passwordDB: string, password: string): Promise<boolean> => {
        return argon2.verify(passwordDB, password);
    }

    public static generateToken = (id: number, username: string, password: string): string => {
        const secretKey: string = process.env.JWT_SECRET_KEY || 'aldyarviansyah@gmail.com';
        const token: string = jwt.sign({id, username, password}, secretKey);
        return token;
    }
}

export default Authentication;