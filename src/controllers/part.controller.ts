import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/controller.interface';
import HttpException from '../utils/http.exception';
import validationMiddleware from '../middleware/validation.middleware';
import schema from '../schema/part.schema';
import PartService from '../service/part.service';
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

class PartController implements Controller {
    public path = '/part';
    public router = Router();
    private PartService = new PartService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(schema.createPart),
            this.createPart
        );

        this.router.put(
            `${this.path}/:id`,
            validationMiddleware(schema.createPart),
            this.updatePart
        );

        this.router.post(
            `${this.path}/images`,
            upload.array('images'),
            this.uploadImages
        );

        this.router.get(`${this.path}`, this.getAllParts);

        this.router.get(`${this.path}/:id`, this.getPartById);

        this.router.delete(`${this.path}/:id`, this.deletePartById);
    }

    private createPart = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                product_title,
                make,
                price,
                category,
                location,
                condition,
                description,
                images,
                store,
            } = req.body;
            const Part = await this.PartService.createPart(
                product_title,
                make,
                price,
                category,
                location,
                condition,
                description,
                images,
                store
            );
            res.status(201).json({ Part });
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

    private updatePart = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const {
                product_title,
                make,
                price,
                category,
                location,
                condition,
                description,
            } = req.body;

            const updatedPart = await this.PartService.updatePart(
                id,
                product_title,
                make,
                price,
                category,
                location,
                condition,
                description
            );

            if (updatedPart) {
                res.json({ Part: updatedPart });
            } else {
                next(new HttpException(404, 'Part not found'));
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

    private getAllParts = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const parts = await this.PartService.getAllParts();
            res.json({ parts });
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };

    private getPartById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const Part = await this.PartService.getPartById(id);

            if (Part) {
                res.json(Part);
            } else {
                next(new HttpException(404, 'Part not found'));
            }
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };

    private deletePartById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const result = await this.PartService.deletePartById(id);

            if (result) {
                res.json({ message: 'Part deleted successfully' });
            } else {
                next(new HttpException(404, 'Part not found'));
            }
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };
}

export default PartController;
