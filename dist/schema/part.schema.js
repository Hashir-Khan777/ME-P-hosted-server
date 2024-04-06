"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var createPart = joi_1.default.object({
    product_title: joi_1.default.string().required(),
    make: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    category: joi_1.default.string().required(),
    store: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    condition: joi_1.default.string().valid('used', 'new').required(),
    description: joi_1.default.string(),
    images: joi_1.default.array().items(joi_1.default.string()), // Array of strings for image URLs
});
exports.default = { createPart: createPart };
