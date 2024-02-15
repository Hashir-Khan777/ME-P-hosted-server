import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/controller.interface';
import HttpException from '../utils/http.exception';
import validationMiddleware from '../middleware/validation.middleware';
import schema from '../schema/category.schema';
import CategoryService from '../service/category.service';

class CategoryController implements Controller {
    public path = '/category';
    public router = Router();
    private categoryService = new CategoryService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(schema.createCategory),
            this.createCategory
        );

        this.router.get(`${this.path}`, this.getAllCategories);

        this.router.get(`${this.path}/:id`, this.getCategoryById);

        this.router.delete(`${this.path}/:id`, this.deleteCategoryById);
    }

    private createCategory = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        console.log(req.body, 'req.body');
        try {
            const { category_name, slug, description } = req.body;
            const category = await this.categoryService.createCategory(
                category_name,
                slug,
                description
            );
            res.status(201).json({ category });
        } catch (error) {
            if (error instanceof HttpException) {
                // If the error is already an HttpException, pass it to the error handling middleware
                next(error);
            } else {
                return next(error);
            }
        }
    };

    private getAllCategories = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const categories = await this.categoryService.getAllCategories();
            res.json({ categories });
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };

    private getCategoryById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const category = await this.categoryService.getCategoryById(id);

            if (category) {
                res.json({ category });
            } else {
                next(new HttpException(404, 'Category not found'));
            }
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };

    private deleteCategoryById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const result = await this.categoryService.deleteCategoryById(id);

            if (result) {
                res.json({ message: 'Category deleted successfully' });
            } else {
                next(new HttpException(404, 'Category not found'));
            }
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    };
}

export default CategoryController;
