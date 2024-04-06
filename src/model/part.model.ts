import { Schema, model } from 'mongoose';
import PartDocument from '../interface/part.interface';

const partSchema = new Schema(
    {
        product_title: { type: String, required: true, unique: true },
        make: { type: String, required: true },
        price: { type: Number, required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        store: {
            type: Schema.Types.ObjectId,
            ref: 'Store',
            required: true,
        },
        location: { type: String, required: true },
        condition: { type: String, enum: ['used', 'new'], required: true },
        description: { type: String, required: true },
        images: [{ type: String }], // An array of strings for image URLs
    },
    { timestamps: true }
);

export default model<PartDocument>('Part', partSchema);
