import { Request, Response } from 'express';
import Authentication  from '../utils/Authentication';
const db: any = require('../db/models');

class AuthController {
    register = async (req: Request, res: Response): Promise<Response> => {
        try {
            let { username, password } = req.body;
            const hashedPassword: string = await Authentication.hash(password);
            const user: any = await db.user.create({
                username,
                password: hashedPassword,
            });

            return res.status(200).json({
                success: true,  
                data: user
            })
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error
            });
        }
    }

    login =  async (req: Request, res: Response): Promise<Response> => {
        try {
            let { username, password } = req.body;

            const user: any = await db.user.findOne({
                where: { username },
            });
            if(!user){
                return res.status(400).json({
                    success: false,  
                    message: `That username doesn't exist`
                })
            }

            const valid: boolean = await Authentication.verify(user.password, password);
            if(!valid){
                return res.status(400).json({
                    success: false,  
                    message: `incorrect password`
                });
            }
            
            let token: string = Authentication.generateToken(user.id, user.username, user.password);
            
            return res.status(200).json({
                success: true,  
                token
            })
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error
            });
        }
    }

   profile = async (req: Request, res: Response): Promise<Response> => {
        try {
            return res.status(200).json({
                success: true,
                data: req.app.locals.credential
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error
            });
        }
   }
}

export default new AuthController();