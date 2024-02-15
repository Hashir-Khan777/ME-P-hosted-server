import { Router, Request, Response, NextFunction } from "express";
import Controller from "../utils/controller.interface";
import HttpException from "../utils/http.exception";
import validationMiddleware from "../middleware/validation.middleware";
import schema from "../schema/review.schema";
import ReviewService from "../service/review.service";

class ReviewController implements Controller {
    public path = "/review";
    public router = Router();
    private ReviewService = new ReviewService;

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}`,
            validationMiddleware(schema.Review),
            this.addReview
        );

        this.router.get(
            `${this.path}`,
            this.getAllReviews
        );

        this.router.get(
            `${this.path}/:id`,
            this.getReviewById
        );

        this.router.delete(
            `${this.path}/:id`,
            this.deleteReviewById
        );
    }

    private addReview = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {
                user,
                part,
                rating,
                review
            } = req.body;
            const Review = await this.ReviewService.addReview(
                user,
                part,
                rating,
                review)
            res.status(201).json({ Review });
        } catch (error) {
            console.log(error)
            if (error instanceof HttpException) {
                next(error);
            } else {
                return next(error);
            }
        }
    }

    private getAllReviews = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const reviews = await this.ReviewService.getAllReviews();
            res.json({ reviews });
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    }

    private getReviewById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const Review = await this.ReviewService.getReviewById(id);

            if (Review) {
                res.json({ Review });
            } else {
                next(new HttpException(404, 'Review not found'));
            }
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    }

    private deleteReviewById = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { id } = req.params;
            const result = await this.ReviewService.deleteReviewById(id);

            if (result) {
                res.json({ message: 'Review deleted successfully' });
            } else {
                next(new HttpException(404, 'Review not found'));
            }
        } catch (err) {
            next(new HttpException(500, 'Internal Server Error'));
        }
    }
}

export default ReviewController;