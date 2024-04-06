import Rental from '../model/rentals.model';
import RentalDocument from '../interface/rentals.interface'; // Update the path accordingly
import CategoryDocument from '../interface/category.interface'; // Update the path accordingly
import HttpException from '../utils/http.exception';

class RentalService {
    private Rental = Rental;

    public async createRental(
        rental_name: string,
        model: string,
        pricing_type: 'monthly' | 'weekly' | 'daily',
        year: number,
        make: string,
        price: number,
        category: CategoryDocument,
        location: string,
        sku: string,
        available_from: Date,
        end_date: Date,
        condition: 'used' | 'new',
        description: string,
        reserved: boolean,
        images: string[],
        store: string
    ): Promise<RentalDocument> {
        try {
            const dup = await this.Rental.findOne({ rental_name: rental_name });
            if (dup) {
                throw new HttpException(
                    409,
                    'A rental with this name already exists'
                );
            }

            const rental = await this.Rental.create({
                rental_name,
                model,
                pricing_type,
                year,
                make,
                price,
                category,
                location,
                sku,
                available_from,
                end_date,
                condition,
                description,
                reserved,
                images,
                store,
            });

            return rental;
        } catch (err) {
            throw err;
        }
    }

    public async updateRental(
        id: string,
        rental_name: string,
        model: string,
        pricing_type: 'monthly' | 'weekly' | 'daily',
        year: number,
        make: string,
        price: number,
        category: CategoryDocument,
        location: string,
        sku: number,
        available_from: Date,
        end_date: Date,
        condition: 'used' | 'new',
        description: string
    ): Promise<RentalDocument | null> {
        try {
            const rental = await this.Rental.findByIdAndUpdate(
                id,
                {
                    rental_name,
                    model,
                    pricing_type,
                    year,
                    make,
                    price,
                    category,
                    location,
                    sku,
                    available_from,
                    end_date,
                    condition,
                    description,
                },
                { new: true }
            );

            return rental;
        } catch (err) {
            throw err;
        }
    }

    public async getAllRentals(): Promise<RentalDocument[]> {
        try {
            const rentals = await this.Rental.find();
            return rentals;
        } catch (err) {
            throw err;
        }
    }

    public async getRentalById(id: string): Promise<RentalDocument | null> {
        try {
            const rental = await this.Rental.findById(id).populate([
                { path: 'store' },
                { path: 'category' },
                { path: 'store', populate: { path: 'user' } },
            ]);
            return rental;
        } catch (err) {
            throw err;
        }
    }

    public async deleteRentalById(id: string): Promise<boolean> {
        try {
            const result = await this.Rental.findByIdAndDelete(id);
            return result !== null;
        } catch (err) {
            throw err;
        }
    }
}

export default RentalService;
