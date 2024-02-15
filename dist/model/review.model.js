"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var reviewSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    part: { type: mongoose_1.Schema.Types.ObjectId, ref: "Part", required: true },
    rating: { type: Number, required: true },
    review: { type: String, required: true }
}, { timestamps: true });
exports.default = (0, mongoose_1.model)('Review', reviewSchema);
