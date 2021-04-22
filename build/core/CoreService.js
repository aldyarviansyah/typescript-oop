"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CoreService {
    constructor(req) {
        this.credential = req.app.locals.credential;
        this.body = req.body;
        this.params = req.params;
        this.query = req.query;
    }
}
exports.default = CoreService;
