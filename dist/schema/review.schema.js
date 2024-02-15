"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var joi_1 = __importDefault(require("joi"));
var Review = joi_1.default.object({
    user: joi_1.default.string().required(),
    part: joi_1.default.string().required(),
    rating: joi_1.default.number().required(),
    review: joi_1.default.string().required(),
});
exports.default = { Review: Review };
