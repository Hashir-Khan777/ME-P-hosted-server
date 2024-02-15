import 'dotenv/config';
import 'module-alias/register';
import App from './app';
import validateEnv from './utils/validateEnv';
import CategoryController from './controllers/category.controller';
import EquipmentController from './controllers/equipment.controller';
import RentalController from './controllers/rentals.controller';
import PartController from './controllers/part.controller';
import AuthController from './controllers/auth.controller';
import ReviewController from './controllers/review.controller';
import StoreController from './controllers/store.controller';

validateEnv();

const app = new App(
    [
        new CategoryController(),
        new EquipmentController(),
        new RentalController(),
        new PartController(),
        new AuthController(),
        new ReviewController(),
        new StoreController(),
    ],
    5000
);

app.listen();
