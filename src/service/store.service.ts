import StoreDocument from '../interface/store.interface';
import Store from '../model/store.model';
import Auth from '../model/auth.model';
import { StringSchema } from 'joi';

class StoreService {
    private Store = Store;
    private User = Auth;

    public async createStore(
        user: string,
        country: string,
        state: string,
        area: string,
        postalCode: string,
        address: StringSchema,
        name: string
    ): Promise<StoreDocument> {
        try {
            const Store = await this.Store.create({
                user,
                country,
                state,
                area,
                postalCode,
                address,
                name,
            });
            await this.User.findByIdAndUpdate(
                { _id: user },
                { $addToSet: { roles: 'seller' } },
                { new: true }
            );
            return Store;
        } catch (err) {
            throw err;
        }
    }

    public async getStores(): Promise<any> {
        try {
            const Stores = await this.Store.find({});
            return Stores;
        } catch (err) {
            throw err;
        }
    }
}

export default StoreService;
