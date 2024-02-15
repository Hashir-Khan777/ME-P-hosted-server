"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var createRental = joi_1.default.object({
    rental_name: joi_1.default.string().required(),
    model: joi_1.default.string().required(),
    pricing_type: joi_1.default.string().valid('monthly', 'weekly', 'daily').required(),
    year: joi_1.default.number().required(),
    make: joi_1.default.string().required(),
    price: joi_1.default.number().required(),
    category: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    sku: joi_1.default.string().required(),
    available_from: joi_1.default.date().required(),
    end_date: joi_1.default.date().required(),
    condition: joi_1.default.string().valid('used', 'new').required(),
    description: joi_1.default.string(),
    reserved: joi_1.default.boolean().default(false),
    images: joi_1.default.array().items(joi_1.default.string()), // Array of strings for image URLs
});
exports.default = { createRental: createRental };
