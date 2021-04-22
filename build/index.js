"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const compression_1 = __importDefault(require("compression"));
const helmet_1 = __importDefault(require("helmet"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const readFiles_1 = __importDefault(require("./libs/readFiles"));
const dotenv_1 = require("dotenv");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swaggerDocument = __importStar(require("./swagger.json"));
dotenv_1.config();
class App {
    constructor() {
        this.app = express_1.default();
        this.plugins();
        this.routes();
    }
    plugins() {
        this.app.use(body_parser_1.default.json());
        this.app.use(morgan_1.default("dev"));
        this.app.use(compression_1.default());
        this.app.use(helmet_1.default());
        this.app.use(cors_1.default());
    }
    routes() {
        // ? Swagger Route
        this.app.use('/swagger', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swaggerDocument));
        // ? End Swagger Route
        const pathRoute = path_1.default.join(__dirname, './routes');
        const routers = readFiles_1.default.walkSync(pathRoute);
        routers.forEach((file) => {
            let paths = path_1.default.parse(file).name;
            if (paths === 'RouterInterface' || paths === 'BaseRouter')
                return;
            let sliceFile = file.split(path_1.default.sep).slice(0, -1);
            let routePath = file
                .split(path_1.default.sep)
                .slice(sliceFile.length - 3, -1)
                .join("/");
            routePath = `${routePath}/${path_1.default.parse(file).name}`;
            Promise.resolve().then(() => __importStar(require(`./${routePath}`))).then((route) => {
                routePath = routePath
                    .split("/")
                    .slice(1, 4)
                    .join("/");
                this.app.use(`/${routePath}`, route.default);
                console.log(`/${routePath}`);
            });
        });
    }
}
const port = process.env.PORT;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server Started on localhost:${port}`);
});
