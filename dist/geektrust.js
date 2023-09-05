"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const processor_1 = require("./utils/processor");
const filename = process.argv[2];
fs_1.default.readFile(filename, "utf8", (err, data) => {
    if (err) {
        console.error('Error reading the file:', err);
        return;
    }
    const lines = data.split("\n");
    for (const line of lines) {
        (0, processor_1.processLine)(line.trim());
    }
});
