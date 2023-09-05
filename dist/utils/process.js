"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.processor = void 0;
const fs_1 = __importDefault(require("fs"));
const processor = (filename) => {
    const output = [];
    fs_1.default.readFile(filename, "utf8", (err, data) => {
        const input = data.split("\n");
        input.map((line) => {
            output.push(line);
        });
        console.log(output);
    });
    return output;
};
exports.processor = processor;
