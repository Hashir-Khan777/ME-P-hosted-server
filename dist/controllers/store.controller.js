"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var store_service_1 = __importDefault(require("../service/store.service"));
var http_exception_1 = __importDefault(require("../utils/http.exception"));
var jwt_middleware_1 = require("../middleware/jwt.middleware");
var cloudinary_middleware_1 = require("../middleware/cloudinary.middleware");
var multer_1 = __importDefault(require("multer"));
var path_1 = __importDefault(require("path"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads'); // Specify the destination folder
    },
    filename: function (req, file, cb) {
        var ext = path_1.default.extname(file.originalname);
        cb(null, Date.now() + ext); // Use a unique filename (timestamp) for each image
    },
});
var upload = (0, multer_1.default)({ storage: storage });
var StoreController = /** @class */ (function () {
    function StoreController() {
        var _this = this;
        this.path = '/store';
        this.router = (0, express_1.Router)();
        this.StoreService = new store_service_1.default();
        this.uploadImage = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var file, image, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        file = req.file;
                        console.log(file);
                        return [4 /*yield*/, (0, cloudinary_middleware_1.uploadImage)(file.path)];
                    case 1:
                        image = _a.sent();
                        res.status(201).json(image);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        console.log(err_1);
                        next(new http_exception_1.default(500, 'Internal Server Error'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.addStore = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var user, _a, country, state, area, postalCode, address, name_1, paymentScreenShot, pricingPlan, phoneNumber, store, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        user = req.user;
                        _a = req.body, country = _a.country, state = _a.state, area = _a.area, postalCode = _a.postalCode, address = _a.address, name_1 = _a.name, paymentScreenShot = _a.paymentScreenShot, pricingPlan = _a.pricingPlan, phoneNumber = _a.phoneNumber;
                        return [4 /*yield*/, this.StoreService.createStore(user === null || user === void 0 ? void 0 : user._id, country, state, area, postalCode, address, name_1, paymentScreenShot, pricingPlan, phoneNumber)];
                    case 1:
                        store = _b.sent();
                        res.status(201).json(store);
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        if (error_1 instanceof http_exception_1.default) {
                            next(error_1);
                        }
                        else {
                            return [2 /*return*/, next(error_1)];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getStores = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var stores, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.StoreService.getStores()];
                    case 1:
                        stores = _a.sent();
                        res.status(200).json(stores);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.log(error_2);
                        if (error_2 instanceof http_exception_1.default) {
                            next(error_2);
                        }
                        else {
                            return [2 /*return*/, next(error_2)];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getStoreByUserId = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, store, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params._id;
                        return [4 /*yield*/, this.StoreService.getStoreByUserId(_id)];
                    case 1:
                        store = _a.sent();
                        res.status(200).json(store);
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.log(error_3);
                        if (error_3 instanceof http_exception_1.default) {
                            next(error_3);
                        }
                        else {
                            return [2 /*return*/, next(error_3)];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.approveStore = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _id, store, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        _id = req.params._id;
                        return [4 /*yield*/, this.StoreService.approveStore(_id)];
                    case 1:
                        store = _a.sent();
                        res.status(200).json(store);
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.log(error_4);
                        if (error_4 instanceof http_exception_1.default) {
                            next(error_4);
                        }
                        else {
                            return [2 /*return*/, next(error_4)];
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.initialiseRoutes();
    }
    StoreController.prototype.initialiseRoutes = function () {
        this.router.post("".concat(this.path), jwt_middleware_1.isAuth, this.addStore);
        this.router.get("".concat(this.path), jwt_middleware_1.isAuth, this.getStores);
        this.router.put("".concat(this.path, "/approve/:_id"), this.approveStore);
        this.router.get("".concat(this.path, "/user/:_id"), this.getStoreByUserId);
        this.router.post("".concat(this.path, "/upload/screenshot"), jwt_middleware_1.isAuth, upload.single('image'), this.uploadImage);
    };
    return StoreController;
}());
exports.default = StoreController;
