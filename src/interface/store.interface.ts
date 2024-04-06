import { Document } from 'mongoose';

export default interface StoreDocument extends Document {
    user: String;
    country: String;
    state: String;
    area: String;
    postalCode: String;
    pricingPlan: String;
    address: String;
    name: String;
    phoneNumber: Number;
    paymentScreenShot: String;
    approve: Boolean;
}
