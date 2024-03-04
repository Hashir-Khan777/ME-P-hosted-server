import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/controller.interface';
import StoreService from '../service/store.service';
import HttpException from '../utils/http.exception';
import { isAuth } from '../middleware/jwt.middleware';

class StoreController implements Controller {
    public path = '/store';
    public router = Router();
    private StoreService = new StoreService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(`${this.path}`, isAuth, this.addStore);
        this.router.get(`${this.path}`, isAuth, this.getStores);
    }

    private addStore = async (
        req: any,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { user } = req;
            const { country, state, area, postalCode, address, name } =
                req.body;
            const store = await this.StoreService.createStore(
                user?._id,
                country,
                state,
                area,
                postalCode,
                address,
                name
            );
            res.status(201).json(store);
        } catch (error) {
            console.log(error);
            if (error instanceof HttpException) {
                next(error);
            } else {
                return next(error);
            }
        }
    };

    private getStores = async (
        req: any,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const stores = await this.StoreService.getStores();
            res.status(200).json(stores);
        } catch (error) {
            console.log(error);
            if (error instanceof HttpException) {
                next(error);
            } else {
                return next(error);
            }
        }
    };
}

export default StoreController;
