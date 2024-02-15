import { Schema, model } from "mongoose";
import CategoryDocument from "../interface/category.interface";

const CategorySchema = new Schema(
    {
        category_name: { type: String, required: true, unique: true },
        slug: { type: String, required: true, unique: true },
        description: { type: String, required: true }
    },
    { timestamps: true }
);

export default model<CategoryDocument>('Category', CategorySchema);

