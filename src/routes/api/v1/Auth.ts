import BaseRouter from '../../../core/BaseRouter';
import AuthController from '../../../controllers/AuthController';
import { auth } from '../../../middlewares/AuthMiddleware'
import validate from '../../../middlewares/AuthValidator';

class BranchRoutes extends BaseRouter {
    public routes(): void {
        this.router.post("/register", validate, AuthController.register);
        this.router.get("/login", validate, AuthController.login);
        this.router.get("/profile", auth, AuthController.profile);
    }
}

export default new BranchRoutes().router;