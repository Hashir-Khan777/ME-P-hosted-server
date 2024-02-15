import { Schema, model } from 'mongoose';
import EquipmentDocument from '../interface/equipment.interface';

const equipmentSchema = new Schema(
    {
        equipment_name: { type: String, required: true, unique: true },
        model: { type: String, required: true },
        year: { type: Number, required: true },
        make: { type: String, required: true },
        description: { type: String, required: true },
        category: {
            type: Schema.Types.ObjectId,
            ref: 'Category',
            required: true,
        },
        location: { type: String, required: true },
        sku: { type: String, required: true, unique: true },
        condition: { type: String, enum: ['used', 'new'], required: true },
        price: { type: Number, required: true },
        images: [{ type: String }],
    },
    { timestamps: true }
);

export default model<EquipmentDocument>('Equipment', equipmentSchema);
