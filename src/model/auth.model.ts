import { Schema, model } from 'mongoose';
import UserDocument from '../interface/auth.interface';

const authSchema = new Schema(
    {
        email: { type: String, required: true, unique: true },
        password: { type: String, required: true, unique: true },
        roles: [
            {
                type: String,
                enum: ['user', 'seller', 'admin'],
                required: true,
                default: 'user',
            },
        ],
    },
    { timestamps: true }
);

export default model<UserDocument>('Auth', authSchema);
