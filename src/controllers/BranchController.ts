import { Request, Response } from 'express';
import BranchService from '../services/BranchService'

class BranchController {
    index = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: BranchService = new BranchService(req);
            const branches = await service.findAll();

            return res.status(200).json({
                success: true,
                data: branches
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error
            });
        }
    }

    show = async (req: Request, res: Response): Promise<Response> => {
        try{
            const service: BranchService = new BranchService(req);
            const branch = await service.findOne();

            return res.status(200).json({
                success: true,
                data: branch
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error
            });
        }
    }

    create = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: BranchService = new BranchService(req);
            const branch = await service.create();
    
            return res.status(200).json({
                success: true,
                data: branch
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error
            });
        }
    }

    update = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: BranchService = new BranchService(req);
            const branch = await service.findOne();
            if(!branch){
                return res.status(400).json({
                    success: false,
                    message: `Data with id #${req.params.id} not found`
                });
            }
            const result = await service.update();

            return res.status(201).json({
                success: true,
                message: "Data successfully updated"
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error
            });
        }
    }

    delete = async (req: Request, res: Response): Promise<Response> => {
        try {
            const service: BranchService = new BranchService(req);
            const branch = await service.findOne();
            if(!branch){
                return res.status(400).json({
                    success: false,
                    message: `Data with id #${req.params.id} not found`
                });
            }
            const result = await service.delete();

            return res.status(200).json({
                success: true,
                message: "Data successfully deleted"
            });
        } catch (error: any) {
            return res.status(500).json({
                success: false,
                error: error
            });
        }
    }
}

export default new BranchController();