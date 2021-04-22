import BaseRouter from '../../../core/BaseRouter';
import MealController from '../../../controllers/MealController';

class BranchRoutes extends BaseRouter {
    public routes(): void {
        this.router.get("/", MealController.index);
        this.router.get("/:id", MealController.show);
        this.router.post("/", MealController.create);
        this.router.put("/:id", MealController.update);
        this.router.delete("/:id", MealController.delete);
    }
}

export default new BranchRoutes().router;