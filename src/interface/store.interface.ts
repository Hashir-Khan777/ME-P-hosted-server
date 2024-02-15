import { Document } from 'mongoose';

export default interface StoreDocument extends Document {
    user: String;
    country: String;
    state: String;
    area: String;
    postalCode: String;
    address: String;
    name: String;
}
