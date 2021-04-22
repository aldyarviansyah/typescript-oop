"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validate = [
    express_validator_1.check("username").isString(),
    express_validator_1.check("password").isLength({ min: 8 }),
    (req, res, next) => {
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: true,
                errors: errors.array()
            });
        }
        next();
    }
];
exports.default = validate;
