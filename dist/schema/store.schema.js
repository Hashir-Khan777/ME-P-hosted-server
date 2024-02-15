"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var Store = joi_1.default.object({
    user: joi_1.default.string().required(),
    country: joi_1.default.string().required(),
    state: joi_1.default.string().required(),
    area: joi_1.default.string().required(),
    postalCode: joi_1.default.string().required(),
    address: joi_1.default.string().required(),
    name: joi_1.default.string().required(),
});
exports.default = { Store: Store };
