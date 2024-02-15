"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var storeSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true },
    country: { type: String, required: true },
    state: { type: String, required: true },
    area: { type: String, required: true },
    postalCode: { type: String, required: true },
    address: { type: String, required: true },
    name: { type: String, required: true },
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Store', storeSchema);
