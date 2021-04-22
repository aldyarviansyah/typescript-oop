"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const auth = (req, res, next) => {
    if (!req.headers.authorization) {
        return res.status(401).send('unauthenticated');
    }
    let secretKey = process.env.JWT_SECRET_KEY || 'aldyarviansyah@gmail.com';
    const token = req.headers.authorization.split(" ")[1];
    try {
        jsonwebtoken_1.default.verify(token, secretKey, (err, decoded) => {
            if (err) {
                return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
            }
            req.app.locals.credential = decoded;
            next();
        });
    }
    catch (error) {
        return res.status(401).send(error);
    }
};
exports.auth = auth;
