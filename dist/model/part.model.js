"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var partSchema = new mongoose_1.Schema({
    product_title: { type: String, required: true, unique: true },
    make: { type: String, required: true },
    price: { type: Number, required: true },
    category: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Category',
        required: true,
    },
    store: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Store',
        required: true,
    },
    location: { type: String, required: true },
    condition: { type: String, enum: ['used', 'new'], required: true },
    description: { type: String, required: true },
    images: [{ type: String }], // An array of strings for image URLs
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Part', partSchema);
