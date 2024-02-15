"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var createCategory = joi_1.default.object({
    category_name: joi_1.default.string().required(),
    slug: joi_1.default.string().required(),
    description: joi_1.default.string()
});
exports.default = { createCategory: createCategory };
