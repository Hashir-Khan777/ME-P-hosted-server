import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/controller.interface';
import HttpException from '../utils/http.exception';
import validationMiddleware from '../middleware/validation.middleware';
import schema from '../schema/equipment.schema';
import EquipmentService from '../service/equipment.service';
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

class EquipmentController implements Controller {
    public path = '/equipment';
    public router = Router();
    private EquipmentService = new EquipmentService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(schema.createEquipment),
            this.createEquipment
        );

        this.router.get(`${this.path}`, this.getAllEquipments);

        this.router.post(
            `${this.path}/images`,
            upload.array('images'),
            this.uploadImages
        );

        this.router.get(`${this.path}/:id`, this.getEquipmentById);

        this.router.delete(`${this.path}/:id`, this.deleteEquipmentById);
    }

    private createEquipment = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                equipment_name,
                model,
                year,
                make,
                category,
                location,
                sku,
                condition,
                price,
                description,
                images,
                store,
            } = req.body;

            const Equipment = await this.EquipmentService.createEquipment(
                equipment_name,
                model,
                year,
                make,
                category,
                location,
                description,
                sku,
                condition,
                price,
                images,
                store
            );
            res.status(201).json({ Equipment });
        } catch (error) {
            console.log(error);
            if (error instanceof HttpException) {
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

    private getAllEquipments = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const equipments = await this.EquipmentService.getAllEquipments();
            res.json({ equipments });
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };

    private getEquipmentById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const Equipment = await this.EquipmentService.getEquipmentById(id);

            if (Equipment) {
                res.json(Equipment);
            } else {
                next(new HttpException(404, 'Equipment not found'));
            }
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };

    private deleteEquipmentById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const result = await this.EquipmentService.deleteEquipmentById(id);

            if (result) {
                res.json({ message: 'Equipment deleted successfully' });
            } else {
                next(new HttpException(404, 'Equipment not found'));
            }
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };
}

export default EquipmentController;
