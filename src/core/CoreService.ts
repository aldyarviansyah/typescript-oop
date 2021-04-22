import { Request } from 'express';

abstract class CoreService {
    credential: {
        id: number
    };
    body: Request['body'];
    params: Request['params'];
    query: Request['query'];

    constructor(req: Request){
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
    }
}

export default CoreService;