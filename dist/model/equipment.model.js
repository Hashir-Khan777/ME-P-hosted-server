"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var equipmentSchema = new mongoose_1.Schema({
    equipment_name: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    year: { type: Number, required: true },
    make: { type: String, required: true },
    description: { type: String, required: true },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    location: { type: String, required: true },
    sku: { type: String, required: true, unique: true },
    condition: { type: String, enum: ['used', 'new'], required: true },
    price: { type: Number, required: true },
    images: [{ type: String }],
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Equipment', equipmentSchema);
