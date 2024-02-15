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
var review_schema_1 = __importDefault(require("../schema/review.schema"));
var review_service_1 = __importDefault(require("../service/review.service"));
var ReviewController = /** @class */ (function () {
    function ReviewController() {
        var _this = this;
        this.path = "/review";
        this.router = (0, express_1.Router)();
        this.ReviewService = new review_service_1.default;
        this.addReview = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var _a, user, part, rating, review, Review, error_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = req.body, user = _a.user, part = _a.part, rating = _a.rating, review = _a.review;
                        return [4 /*yield*/, this.ReviewService.addReview(user, part, rating, review)];
                    case 1:
                        Review = _b.sent();
                        res.status(201).json({ Review: Review });
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
        this.getAllReviews = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var reviews, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.ReviewService.getAllReviews()];
                    case 1:
                        reviews = _a.sent();
                        res.json({ reviews: reviews });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        next(new http_exception_1.default(500, 'Internal Server Error'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.getReviewById = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, Review, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.ReviewService.getReviewById(id)];
                    case 1:
                        Review = _a.sent();
                        if (Review) {
                            res.json({ Review: Review });
                        }
                        else {
                            next(new http_exception_1.default(404, 'Review not found'));
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        next(new http_exception_1.default(500, 'Internal Server Error'));
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); };
        this.deleteReviewById = function (req, res, next) { return __awaiter(_this, void 0, void 0, function () {
            var id, result, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, this.ReviewService.deleteReviewById(id)];
                    case 1:
                        result = _a.sent();
                        if (result) {
                            res.json({ message: 'Review deleted successfully' });
                        }
                        else {
                            next(new http_exception_1.default(404, 'Review not found'));
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
        this.initialiseRoutes();
    }
    ReviewController.prototype.initialiseRoutes = function () {
        this.router.post("".concat(this.path), (0, validation_middleware_1.default)(review_schema_1.default.Review), this.addReview);
        this.router.get("".concat(this.path), this.getAllReviews);
        this.router.get("".concat(this.path, "/:id"), this.getReviewById);
        this.router.delete("".concat(this.path, "/:id"), this.deleteReviewById);
    };
    return ReviewController;
}());
exports.default = ReviewController;
