"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("../../../core/BaseRouter"));
const AuthController_1 = __importDefault(require("../../../controllers/AuthController"));
const AuthMiddleware_1 = require("../../../middlewares/AuthMiddleware");
const AuthValidator_1 = __importDefault(require("../../../middlewares/AuthValidator"));
class BranchRoutes extends BaseRouter_1.default {
    routes() {
        this.router.post("/register", AuthValidator_1.default, AuthController_1.default.register);
        this.router.get("/login", AuthValidator_1.default, AuthController_1.default.login);
        this.router.get("/profile", AuthMiddleware_1.auth, AuthController_1.default.profile);
    }
}
exports.default = new BranchRoutes().router;
