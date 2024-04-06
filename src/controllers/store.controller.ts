import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/controller.interface';
import StoreService from '../service/store.service';
import HttpException from '../utils/http.exception';
import { isAuth } from '../middleware/jwt.middleware';
import { uploadImage } from '../middleware/cloudinary.middleware';
import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads'); // Specify the destination folder
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, Date.now() + ext); // Use a unique filename (timestamp) for each image
    },
});

const upload = multer({ storage: storage });

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
        this.router.put(`${this.path}/approve/:_id`, this.approveStore);
        this.router.get(`${this.path}/user/:_id`, this.getStoreByUserId);
        this.router.post(
            `${this.path}/upload/screenshot`,
            isAuth,
            upload.single('image'),
            this.uploadImage
        );
    }

    private uploadImage = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const file = req.file as Express.Multer.File;

            console.log(file);

            const image = await uploadImage(file.path);

            res.status(201).json(image);
        } catch (err) {
            console.log(err);
            next(new HttpException(500, 'Internal Server Error'));
        }
    };

    private addStore = async (
        req: any,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { user } = req;
            const {
                country,
                state,
                area,
                postalCode,
                address,
                name,
                paymentScreenShot,
                pricingPlan,
                phoneNumber,
            } = req.body;
            const store = await this.StoreService.createStore(
                user?._id,
                country,
                state,
                area,
                postalCode,
                address,
                name,
                paymentScreenShot,
                pricingPlan,
                phoneNumber
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

    private getStoreByUserId = async (
        req: any,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.params;
            const store = await this.StoreService.getStoreByUserId(_id);
            res.status(200).json(store);
        } catch (error) {
            console.log(error);
            if (error instanceof HttpException) {
                next(error);
            } else {
                return next(error);
            }
        }
    };

    private approveStore = async (
        req: any,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { _id } = req.params;
            const store = await this.StoreService.approveStore(_id);
            res.status(200).json(store);
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
