import { Router, Request, Response, NextFunction } from 'express';
import Controller from '../utils/controller.interface';
import HttpException from '../utils/http.exception';
import validationMiddleware from '../middleware/validation.middleware';
import schema from '../schema/auth.schema';
import AuthService from '../service/auth.service';
import { isAuth } from '../middleware/jwt.middleware';

class AuthController implements Controller {
    public path = '/auth';
    public router = Router();
    private AuthService = new AuthService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes() {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(schema.Auth),
            this.register
        );

        this.router.post(
            `${this.path}/login`,
            validationMiddleware(schema.Auth),
            this.login
        );

        this.router.get(`${this.path}/verify`, isAuth, this.verify);
    }

    private register = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const { user, token } = await this.AuthService.registerUser(
                email,
                password
            );
            res.status(201).json({
                user,
                token,
                message: 'Registration successful',
            });
        } catch (error) {
            next(error);
        }
    };

    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const { email, password } = req.body;
            const { user, token } = await this.AuthService.loginUser(
                email,
                password
            );
            res.json({ user, token, message: 'Login successful' });
        } catch (error) {
            next(error);
        }
    };

    private verify = async (
        req: any,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const user = await this.AuthService.verifyUser(req.user);
            res.json({ user });
        } catch (error) {
            next(error);
        }
    };
}

export default AuthController;
