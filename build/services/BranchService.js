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
const sequelize_1 = __importDefault(require("sequelize"));
const CoreService_1 = __importDefault(require("../core/CoreService"));
const db = require('../db/models');
const { Op } = sequelize_1.default;
const Distance_1 = __importDefault(require("../helpers/Distance"));
class BranchService extends CoreService_1.default {
    constructor() {
        super(...arguments);
        this.findAll = () => __awaiter(this, void 0, void 0, function* () {
            const where = this.filter();
            const whereChild = this.filterChild();
            const customField = this.customFields();
            const branches = yield db.branch.findAll({
                attributes: Object.keys(db.branch.rawAttributes).concat(customField),
                where,
                include: [
                    {
                        model: db.meal,
                        as: "meals",
                        where: whereChild,
                        attributes: ["mealPlanName", "maximumCapacity", "price", "day", "startTime", "endTime"]
                    }
                ]
            });
            return branches;
        });
        this.findOne = () => __awaiter(this, void 0, void 0, function* () {
            const branch = yield db.branch.findOne({
                where: { id: this.params.id },
                attributes: ["id", "name", "latitude", "longitude"],
                include: [
                    {
                        model: db.meal,
                        as: "meals",
                        attributes: ["mealPlanName", "maximumCapacity", "price", "day", "startTime", "endTime"],
                    }
                ]
            });
            return branch;
        });
        this.create = () => __awaiter(this, void 0, void 0, function* () {
            let { name, latitude, longitude } = this.body;
            const branch = yield db.branch.create(this.body, {
                include: [
                    {
                        model: db.meal,
                        as: "meals"
                    }
                ]
            });
            return branch;
        });
        this.update = () => __awaiter(this, void 0, void 0, function* () {
            let { name, latitude, longitude } = this.body;
            const branch = yield db.branch.update(this.body, {
                where: {
                    id: this.params.id
                }
            });
            return branch;
        });
        this.delete = () => __awaiter(this, void 0, void 0, function* () {
            const branch = yield db.branch.destroy({
                where: {
                    id: this.params.id
                }
            });
            return branch;
        });
        this.filter = () => {
            let { name, latitude, longitude, distance, } = this.query;
            const where = {};
            if (name) {
                Object.assign(where, {
                    name
                });
            }
            if (latitude && longitude && distance) {
                const queryLatitude = `(SELECT CAST(COALESCE(NULLIF((SELECT "branch"."latitude"), 0), 0) AS NUMERIC) AS "latitude")`;
                const queryLongitude = `(SELECT CAST(COALESCE(NULLIF((SELECT "branch"."longitude"), 0), 0) AS NUMERIC) AS "longitude")`;
                const calDistance = Distance_1.default(latitude, longitude, queryLatitude, queryLongitude);
                const distances = db.sequelize.literal(calDistance);
                Object.assign(where, {
                    [Op.and]: [db.sequelize.where(distances, { [Op.lte]: distance })]
                });
            }
            return where;
        };
        this.filterChild = () => {
            let { price, date, time } = this.query;
            const where = {};
            if (price) {
                Object.assign(where, {
                    price
                });
            }
            if (date) {
                let start = new Date(date.toString());
                start.setHours(0, 0, 0, 0);
                if (time) {
                    let hours = time.toString().split(":");
                    start.setHours(hours[0], 0, 0, 0);
                }
                let end = new Date(date.toString());
                end.setHours(23, 59, 59, 999);
                if (time) {
                    let hours = time.toString().split(":");
                    end.setHours(hours[0], 0, 0, 0);
                }
                Object.assign(where, {
                    [Op.or]: [
                        {
                            startTime: {
                                [Op.gte]: start
                            }
                        },
                        {
                            endTime: {
                                [Op.lte]: end
                            }
                        }
                    ]
                });
            }
            return where;
        };
        this.customFields = () => {
            const fields = [];
            fields.push([
                db.sequelize.literal(`(
                    SELECT distinct on (m."brachId") price FROM 
                    meals m 
                    where m."brachId" = "branch"."id"
                    order by m."brachId" , m.price  
                )`),
                'startingFrom'
            ]);
            return fields;
        };
    }
}
exports.default = BranchService;
