"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("../../../core/BaseRouter"));
const MealController_1 = __importDefault(require("../../../controllers/MealController"));
class BranchRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get("/", MealController_1.default.index);
        this.router.get("/:id", MealController_1.default.show);
        this.router.post("/", MealController_1.default.create);
        this.router.put("/:id", MealController_1.default.update);
        this.router.delete("/:id", MealController_1.default.delete);
    }
}
exports.default = new BranchRoutes().router;
