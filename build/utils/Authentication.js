"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const argon2_1 = __importDefault(require("argon2"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class Authentication {
}
Authentication.hash = (password) => {
    return argon2_1.default.hash(password);
};
Authentication.verify = (passwordDB, password) => {
    return argon2_1.default.verify(passwordDB, password);
};
Authentication.generateToken = (id, username, password) => {
    const secretKey = process.env.JWT_SECRET_KEY || 'aldyarviansyah@gmail.com';
    const token = jsonwebtoken_1.default.sign({ id, username, password }, secretKey);
    return token;
};
exports.default = Authentication;
