import express, { Application } from "express";
import bodyParser from 'body-parser';
import morgan from 'morgan';
import compression from 'compression';
import helmet from 'helmet';
import cors from 'cors';
import path from 'path';
import routes from './libs/readFiles';
import { config as dotenv } from 'dotenv';
import swaggerUi from 'swagger-ui-express'
import * as swaggerDocument from './swagger.json'
dotenv();

class App{
    public app: Application;

    constructor() {
        this.app = express();
        this.plugins();
        this.routes();
    }

    protected plugins(): void {
        this.app.use(bodyParser.json());
        this.app.use(morgan("dev"));
        this.app.use(compression());
        this.app.use(helmet());
        this.app.use(cors());
    }

    protected routes(): void {
        // ? Swagger Route
        this.app.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));   
        // ? End Swagger Route
        
        const pathRoute: string = path.join(__dirname, './routes');
        const routers: string[] = routes.walkSync(pathRoute);

        routers.forEach((file: string) => {
            let paths: string = path.parse(file).name;
            if(paths === 'RouterInterface' || paths === 'BaseRouter') return;
            let sliceFile: any[] = file.split(path.sep).slice(0, -1);
            let routePath: string = file
                .split(path.sep)
                .slice(sliceFile.length-3, -1)
                .join("/");
            
            routePath = `${routePath}/${path.parse(file).name}`;
            import(`./${routePath}`).then((route: any) => {
                routePath = routePath
                    .split("/")
                    .slice(1,4)
                    .join("/");

                this.app.use(`/${routePath}`, route.default);
                console.log(`/${routePath}`);
            });
        });

    }
}


const port: any = process.env.PORT;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server Started on localhost:${port}`);
}); 