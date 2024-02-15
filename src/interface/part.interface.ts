import { Document } from 'mongoose';
import CategoryDocument from './category.interface';

export default interface PartDocument extends Document {
    product_title: string;
    make: string;
    price: number;
    category: string;
    location: string;
    condition: 'used' | 'new';
    description: string;
    images: string[]; // Use an array to store multiple image URLs
}
