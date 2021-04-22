"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const CoreService_1 = __importDefault(require("../core/CoreService"));
const db = require('../db/models');
class MealService extends CoreService_1.default {
    constructor() {
        super(...arguments);
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            const meals = yield db.meal.findAll({});
            return meals;
        });
        this.findOne = () => __awaiter(this, void 0, void 0, function* () {
            const meal = yield db.meal.findOne({
                where: { id: this.params.id },
            });
            return meal;
        });
        this.create = () => __awaiter(this, void 0, void 0, function* () {
            let { name, latitude, longitude } = this.body;
            const meal = yield db.meal.create(this.body, {});
            return meal;
        });
        this.update = () => __awaiter(this, void 0, void 0, function* () {
            let { name, latitude, longitude } = this.body;
            const meal = yield db.meal.update(this.body, {
                where: {
                    id: this.params.id
                }
            });
            return meal;
        });
        this.delete = () => __awaiter(this, void 0, void 0, function* () {
            const meal = yield db.meal.destroy({
                where: {
                    id: this.params.id
                }
            });
            return meal;
        });
    }
}
exports.default = MealService;
