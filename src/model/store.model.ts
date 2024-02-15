import { Schema, model } from 'mongoose';
import StoreDocument from '../interface/store.interface';

const storeSchema = new Schema(
    {
        user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
        country: { type: String, required: true },
        state: { type: String, required: true },
        area: { type: String, required: true },
        postalCode: { type: String, required: true },
        address: { type: String, required: true },
        name: { type: String, required: true },
    },
    { timestamps: true }
);

export default model<StoreDocument>('Store', storeSchema);
