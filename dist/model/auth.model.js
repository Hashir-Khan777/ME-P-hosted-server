"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var authSchema = new mongoose_1.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, unique: true },
    roles: [
        {
            type: String,
            enum: ['user', 'seller', 'admin'],
            required: true,
            default: 'user',
        },
    ],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Auth', authSchema);
