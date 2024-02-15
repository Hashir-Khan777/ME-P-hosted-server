import { Document } from 'mongoose';

type roles = 'user' | 'seller' | 'admin';

export default interface UserDocument extends Document {
    email: string;
    password: string;
    roles: roles[];
}
