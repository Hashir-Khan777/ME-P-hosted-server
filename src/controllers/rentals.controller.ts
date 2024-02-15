import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/controller.interface';
import HttpException from '../utils/http.exception';
import validationMiddleware from '../middleware/validation.middleware';
import schema from '../schema/rentals.schema';
import RentalService from '../service/rentals.service';
import multer from 'multer';
import path from 'path';
import { uploadImage } from '../middleware/cloudinary.middleware';

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

class RentalController implements Controller {
    public path = '/rental';
    public router = Router();
    private RentalService = new RentalService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(schema.createRental),
            this.createRental
        );

        this.router.post(
            `${this.path}/images`,
            upload.array('images'),
            this.uploadImages
        );

        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(schema.createRental),
            this.updateRental
        );

        this.router.get(`${this.path}`, this.getAllRentals);

        this.router.get(`${this.path}/:id`, this.getRentalById);

        this.router.delete(`${this.path}/:id`, this.deleteRentalById);
    }

    private createRental = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
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
            } = req.body;
            const Rental = await this.RentalService.createRental(
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
                images
            );
            res.status(201).json({ Rental });
        } catch (error) {
            console.log(error);
            if (error instanceof HttpException) {
                // If the error is already an HttpException, pass it to the error handling middleware
                next(error);
            } else {
                return next(error);
            }
        }
    };

    private uploadImages = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const files = req.files as Express.Multer.File[];

            const images = await Promise.all(
                files.map(async (image) => {
                    const imageCdn = await uploadImage(image.path);
                    return imageCdn;
                })
            );

            res.status(201).json(images);
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };

    private updateRental = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const {
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
            } = req.body;

            const updatedRental = await this.RentalService.updateRental(
                id,
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
                description
            );

            if (updatedRental) {
                res.json({ Rental: updatedRental });
            } else {
                next(new HttpException(404, 'Rental not found'));
            }
        } catch (error) {
            console.log(error);
            if (error instanceof HttpException) {
                next(error);
            } else {
                next(new HttpException(500, 'Internal Server Error'));
            }
        }
    };

    private getAllRentals = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const rentals = await this.RentalService.getAllRentals();
            res.json({ rentals });
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };

    private getRentalById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const Rental = await this.RentalService.getRentalById(id);

            if (Rental) {
                res.json({ Rental });
            } else {
                next(new HttpException(404, 'Rental not found'));
            }
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };

    private deleteRentalById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const result = await this.RentalService.deleteRentalById(id);

            if (result) {
                res.json({ message: 'Rental deleted successfully' });
            } else {
                next(new HttpException(404, 'Rental not found'));
            }
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };
}

export default RentalController;
