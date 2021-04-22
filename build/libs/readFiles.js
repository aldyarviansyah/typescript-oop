"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const walkSync = (dir, filelist = []) => {
    fs_1.default.readdirSync(dir).map((file) => {
        filelist = fs_1.default.statSync(path_1.default.join(dir, file)).isDirectory()
            ? walkSync(path_1.default.join(dir, file), filelist)
            : filelist.concat(path_1.default.join(dir, file));
    });
    return filelist;
};
exports.default = {
    walkSync
};
