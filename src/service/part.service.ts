import Part from '../model/part.model';
import PartDocument from 'interface/part.interface';
import CategoryDocument from '../interface/category.interface'; // Update the path accordingly
import HttpException from '../utils/http.exception';

class PartService {
    private Part = Part;

    public async createPart(
        product_title: string,
        make: string,
        price: number,
        category: CategoryDocument,
        location: string,
        condition: 'used' | 'new',
        description: string,
        images: string[],
        store: string
    ): Promise<PartDocument> {
        try {
            const dup = await this.Part.findOne({
                product_title: product_title,
            });
            if (dup) {
                throw new HttpException(
                    409,
                    'A part with this name already exists'
                );
            }

            const part = await this.Part.create({
                product_title,
                make,
                price,
                category,
                location,
                condition,
                description,
                images,
                store,
            });

            return part;
        } catch (err) {
            throw err;
        }
    }

    public async updatePart(
        id: string,
        product_title: string,
        make: string,
        price: number,
        category: CategoryDocument,
        location: string,
        condition: 'used' | 'new',
        description: string
    ): Promise<PartDocument | null> {
        try {
            const part = await this.Part.findByIdAndUpdate(
                id,
                {
                    product_title,
                    make,
                    price,
                    category,
                    location,
                    condition,
                    description,
                },
                { new: true }
            );

            return part;
        } catch (err) {
            throw err;
        }
    }

    public async getAllParts(): Promise<PartDocument[]> {
        try {
            const rentals = await this.Part.find();
            return rentals;
        } catch (err) {
            throw err;
        }
    }

    public async getPartById(id: string): Promise<PartDocument | null> {
        try {
            const part = await this.Part.findById(id).populate([
                { path: 'store' },
                { path: 'category' },
                { path: 'store', populate: { path: 'user' } },
            ]);
            return part;
        } catch (err) {
            throw err;
        }
    }

    public async deletePartById(id: string): Promise<boolean> {
        try {
            const result = await this.Part.findByIdAndDelete(id);
            return result !== null;
        } catch (err) {
            throw err;
        }
    }
}

export default PartService;
