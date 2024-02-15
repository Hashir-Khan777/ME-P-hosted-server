import { Document } from "mongoose";

export default interface CategoryDocument extends Document {
    category_name: string;
    slug: string;
    description: string;
}