"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseRouter_1 = __importDefault(require("../../../core/BaseRouter"));
const BranchController_1 = __importDefault(require("../../../controllers/BranchController"));
class BranchRoutes extends BaseRouter_1.default {
    routes() {
        this.router.get("/", BranchController_1.default.index);
        this.router.get("/:id", BranchController_1.default.show);
        this.router.post("/", BranchController_1.default.create);
        this.router.put("/:id", BranchController_1.default.update);
        this.router.delete("/:id", BranchController_1.default.delete);
    }
}
exports.default = new BranchRoutes().router;
