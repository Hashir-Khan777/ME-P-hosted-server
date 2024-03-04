"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
require("module-alias/register");
var app_1 = __importDefault(require("./app"));
var validateEnv_1 = __importDefault(require("./utils/validateEnv"));
var category_controller_1 = __importDefault(require("./controllers/category.controller"));
var equipment_controller_1 = __importDefault(require("./controllers/equipment.controller"));
var rentals_controller_1 = __importDefault(require("./controllers/rentals.controller"));
var part_controller_1 = __importDefault(require("./controllers/part.controller"));
var auth_controller_1 = __importDefault(require("./controllers/auth.controller"));
var review_controller_1 = __importDefault(require("./controllers/review.controller"));
var store_controller_1 = __importDefault(require("./controllers/store.controller"));
(0, validateEnv_1.default)();
var app = new app_1.default([
    new category_controller_1.default(),
    new equipment_controller_1.default(),
    new rentals_controller_1.default(),
    new part_controller_1.default(),
    new auth_controller_1.default(),
    new review_controller_1.default(),
    new store_controller_1.default(),
], 5000);
app.listen();
