import { Schema, model } from "mongoose";
import ReviewDocument from "../interface/review.interface";

const reviewSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: "User", required: true },
        part: { type: Schema.Types.ObjectId, ref: "Part", required: true },
        rating: { type: Number, required: true },
        review: { type: String, required: true }
    },
    { timestamps: true }
)

export default model<ReviewDocument>('Review', reviewSchema);
    