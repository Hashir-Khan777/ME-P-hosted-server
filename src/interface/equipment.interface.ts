import { Document } from 'mongoose';
import CategoryDocument from './category.interface';

export default interface EquipmentDocument extends Document {
    equipment_name: string;
    model: string;
    year: number;
    make: string;
    category: string;
    store: string;
    location: string;
    description: string;
    sku: string;
    condition: 'used' | 'new';
    price: number;
    images: string[];
}
