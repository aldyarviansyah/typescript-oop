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
const Authentication_1 = __importDefault(require("../utils/Authentication"));
const db = require('../db/models');
class AuthController {
    constructor() {
        this.register = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { username, password } = req.body;
                const hashedPassword = yield Authentication_1.default.hash(password);
                const user = yield db.user.create({
                    username,
                    password: hashedPassword,
                });
                return res.status(200).json({
                    success: true,
                    data: user
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    error: error
                });
            }
        });
        this.login = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                let { username, password } = req.body;
                const user = yield db.user.findOne({
                    where: { username },
                });
                if (!user) {
                    return res.status(400).json({
                        success: false,
                        message: `That username doesn't exist`
                    });
                }
                const valid = yield Authentication_1.default.verify(user.password, password);
                if (!valid) {
                    return res.status(400).json({
                        success: false,
                        message: `incorrect password`
                    });
                }
                let token = Authentication_1.default.generateToken(user.id, user.username, user.password);
                return res.status(200).json({
                    success: true,
                    token
                });
            }
            catch (error) {
                return res.status(500).json({
                    success: false,
                    error: error
                });
            }
        });
        this.profile = (req, res) => __awaiter(this, void 0, void 0, function* () {
            try {
                return res.status(200).json({
                    success: true,
                    data: req.app.locals.credential
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
exports.default = new AuthController();
