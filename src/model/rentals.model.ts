import { Schema, model } from 'mongoose';
import RentalDocument from '../interface/rentals.interface';

const rentalSchema = new Schema(
    {
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
        sku: { type: String, required: true, unique: true },
        available_from: { type: Date, required: true },
        end_date: { type: Date, required: true },
        condition: { type: String, enum: ['used', 'new'], required: true },
        description: { type: String, required: true },
        reserved: { type: Boolean, required: true, default: false },
        images: [{ type: String }], // An array of strings for image URLs
    },
    { timestamps: true }
);

export default model<RentalDocument>('Rental', rentalSchema);
