"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var createEquipment = joi_1.default.object({
    equipment_name: joi_1.default.string().required(),
    model: joi_1.default.string().required(),
    year: joi_1.default.number().required(),
    make: joi_1.default.string().required(),
    category: joi_1.default.string().required(),
    location: joi_1.default.string().required(),
    description: joi_1.default.string().required(),
    sku: joi_1.default.string().required(),
    condition: joi_1.default.string().valid('used', 'new').required(),
    price: joi_1.default.number().required(),
    images: joi_1.default.array().items(joi_1.default.string()),
});
exports.default = { createEquipment: createEquipment };
