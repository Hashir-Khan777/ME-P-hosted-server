import { Document } from 'mongoose';
import CategoryDocument from './category.interface';

export default interface RentalDocument extends Document {
    rental_name: string;
    model: string;
    pricing_type: 'monthly' | 'weekly' | 'daily';
    year: number;
    make: string;
    price: number;
    category: CategoryDocument;
    location: string;
    sku: string;
    available_from: Date;
    end_date: Date;
    condition: 'used' | 'new';
    description: string;
    reserved: boolean;
    images: string[]; // Use an array to store multiple image URLs
}
