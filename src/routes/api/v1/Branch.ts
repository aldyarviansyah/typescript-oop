import BaseRouter from '../../../core/BaseRouter';
import BranchController from '../../../controllers/BranchController';

class BranchRoutes extends BaseRouter {
    public routes(): void {
        this.router.get("/", BranchController.index);
        this.router.get("/:id", BranchController.show);
        this.router.post("/", BranchController.create);
        this.router.put("/:id", BranchController.update);
        this.router.delete("/:id", BranchController.delete);
    }
}

export default new BranchRoutes().router;