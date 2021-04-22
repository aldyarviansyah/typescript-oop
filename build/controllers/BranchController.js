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
const BranchService_1 = __importDefault(require("../services/BranchService"));
class BranchController {
    constructor() {
        this.index = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new BranchService_1.default(req);
                const branches = yield service.findAll();
                return res.status(200).json({
                    success: true,
                    data: branches
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    error: error
                });
            }
        });
        this.show = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new BranchService_1.default(req);
                const branch = yield service.findOne();
                return res.status(200).json({
                    success: true,
                    data: branch
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    error: error
                });
            }
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new BranchService_1.default(req);
                const branch = yield service.create();
                return res.status(200).json({
                    success: true,
                    data: branch
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    error: error
                });
            }
        });
        this.update = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new BranchService_1.default(req);
                const branch = yield service.findOne();
                if (!branch) {
                    return res.status(400).json({
                        success: false,
                        message: `Data with id #${req.params.id} not found`
                    });
                }
                const result = yield service.update();
                return res.status(201).json({
                    success: true,
                    message: "Data successfully updated"
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    error: error
                });
            }
        });
        this.delete = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                const service = new BranchService_1.default(req);
                const branch = yield service.findOne();
                if (!branch) {
                    return res.status(400).json({
                        success: false,
                        message: `Data with id #${req.params.id} not found`
                    });
                }
                const result = yield service.delete();
                return res.status(200).json({
                    success: true,
                    message: "Data successfully deleted"
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    error: error
                });
            }
        });
    }
}
exports.default = new BranchController();
