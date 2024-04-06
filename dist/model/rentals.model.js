"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var rentalSchema = new mongoose_1.Schema({
    rental_name: { type: String, required: true, unique: true },
    model: { type: String, required: true },
    pricing_type: {
        type: String,
        required: true,
        enum: ['monthly', 'weekly', 'daily'],
    },
    year: { type: Number, required: true },
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
    sku: { type: String, required: true, unique: true },
    available_from: { type: Date, required: true },
    end_date: { type: Date, required: true },
    condition: { type: String, enum: ['used', 'new'], required: true },
    description: { type: String, required: true },
    reserved: { type: Boolean, required: true, default: false },
    images: [{ type: String }], // An array of strings for image URLs
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Rental', rentalSchema);
