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
var http_exception_1 = __importDefault(require("../utils/http.exception"));
var validation_middleware_1 = __importDefault(require("../middleware/validation.middleware"));
var part_schema_1 = __importDefault(require("../schema/part.schema"));
var part_service_1 = __importDefault(require("../service/part.service"));
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
var PartController = /** @class */ (function () {
    function PartController() {
        var _this = this;
        this.path = '/part';
        this.router = (0, express_1.Router)();
        this.PartService = new part_service_1.default();
        this.createPart = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, product_title, make, price, category, location_1, condition, description, images, store, Part, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, product_title = _a.product_title, make = _a.make, price = _a.price, category = _a.category, location_1 = _a.location, condition = _a.condition, description = _a.description, images = _a.images, store = _a.store;
                        return [4 /*yield*/, this.PartService.createPart(product_title, make, price, category, location_1, condition, description, images, store)];
                    case 1:
                        Part = _b.sent();
                        res.status(201).json({ Part: Part });
                        return [3 /*break*/, 3];
                    case 2:
                        error_1 = _b.sent();
                        console.log(error_1);
                        if (error_1 instanceof http_exception_1.default) {
                            // If the error is already an HttpException, pass it to the error handling middleware
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
        this.uploadImages = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var files, images, err_1;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        files = req.files;
                        return [4 /*yield*/, Promise.all(files.map(function (image) { return __awaiter(_this, void 0, void 0, function () {
                                var imageCdn;
                                return __generator(this, function (_a) {
                                    switch (_a.label) {
                                        case 0: return [4 /*yield*/, (0, cloudinary_middleware_1.uploadImage)(image.path)];
                                        case 1:
                                            imageCdn = _a.sent();
                                            return [2 /*return*/, imageCdn];
                                    }
                                });
                            }); }))];
                    case 1:
                        images = _a.sent();
                        res.status(201).json(images);
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        next(new http_exception_1.default(500, 'Internal Server Error'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.updatePart = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, _a, product_title, make, price, category, location_2, condition, description, updatedPart, error_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        _a = req.body, product_title = _a.product_title, make = _a.make, price = _a.price, category = _a.category, location_2 = _a.location, condition = _a.condition, description = _a.description;
                        return [4 /*yield*/, this.PartService.updatePart(id, product_title, make, price, category, location_2, condition, description)];
                    case 1:
                        updatedPart = _b.sent();
                        if (updatedPart) {
                            res.json({ Part: updatedPart });
                        }
                        else {
                            next(new http_exception_1.default(404, 'Part not found'));
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _b.sent();
                        console.log(error_2);
                        if (error_2 instanceof http_exception_1.default) {
                            next(error_2);
                        }
                        else {
                            next(new http_exception_1.default(500, 'Internal Server Error'));
                        }
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getAllParts = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var parts, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.PartService.getAllParts()];
                    case 1:
                        parts = _a.sent();
                        res.json({ parts: parts });
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        next(new http_exception_1.default(500, 'Internal Server Error'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getPartById = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, Part, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.PartService.getPartById(id)];
                    case 1:
                        Part = _a.sent();
                        if (Part) {
                            res.json(Part);
                        }
                        else {
                            next(new http_exception_1.default(404, 'Part not found'));
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_3 = _a.sent();
                        next(new http_exception_1.default(500, 'Internal Server Error'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deletePartById = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, result, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.PartService.deletePartById(id)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.json({ message: 'Part deleted successfully' });
                        }
                        else {
                            next(new http_exception_1.default(404, 'Part not found'));
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_4 = _a.sent();
                        next(new http_exception_1.default(500, 'Internal Server Error'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.initialiseRoutes();
    }
    PartController.prototype.initialiseRoutes = function () {
        this.router.post("".concat(this.path), (0, validation_middleware_1.default)(part_schema_1.default.createPart), this.createPart);
        this.router.put("".concat(this.path, "/:id"), (0, validation_middleware_1.default)(part_schema_1.default.createPart), this.updatePart);
        this.router.post("".concat(this.path, "/images"), upload.array('images'), this.uploadImages);
        this.router.get("".concat(this.path), this.getAllParts);
        this.router.get("".concat(this.path, "/:id"), this.getPartById);
        this.router.delete("".concat(this.path, "/:id"), this.deletePartById);
    };
    return PartController;
}());
exports.default = PartController;
