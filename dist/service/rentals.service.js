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
var rentals_model_1 = __importDefault(require("../model/rentals.model"));
var http_exception_1 = __importDefault(require("../utils/http.exception"));
var RentalService = /** @class */ (function () {
    function RentalService() {
        this.Rental = rentals_model_1.default;
    }
    RentalService.prototype.createRental = function (rental_name, model, pricing_type, year, make, price, category, location, sku, available_from, end_date, condition, description, reserved, images, store) {
        return __awaiter(this, void 0, void 0, function () {
            var dup, rental, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.Rental.findOne({ rental_name: rental_name })];
                    case 1:
                        dup = _a.sent();
                        if (dup) {
                            throw new http_exception_1.default(409, 'A rental with this name already exists');
                        }
                        return [4 /*yield*/, this.Rental.create({
                                rental_name: rental_name,
                                model: model,
                                pricing_type: pricing_type,
                                year: year,
                                make: make,
                                price: price,
                                category: category,
                                location: location,
                                sku: sku,
                                available_from: available_from,
                                end_date: end_date,
                                condition: condition,
                                description: description,
                                reserved: reserved,
                                images: images,
                                store: store,
                            })];
                    case 2:
                        rental = _a.sent();
                        return [2 /*return*/, rental];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    RentalService.prototype.updateRental = function (id, rental_name, model, pricing_type, year, make, price, category, location, sku, available_from, end_date, condition, description) {
        return __awaiter(this, void 0, void 0, function () {
            var rental, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Rental.findByIdAndUpdate(id, {
                                rental_name: rental_name,
                                model: model,
                                pricing_type: pricing_type,
                                year: year,
                                make: make,
                                price: price,
                                category: category,
                                location: location,
                                sku: sku,
                                available_from: available_from,
                                end_date: end_date,
                                condition: condition,
                                description: description,
                            }, { new: true })];
                    case 1:
                        rental = _a.sent();
                        return [2 /*return*/, rental];
                    case 2:
                        err_2 = _a.sent();
                        throw err_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RentalService.prototype.getAllRentals = function () {
        return __awaiter(this, void 0, void 0, function () {
            var rentals, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Rental.find()];
                    case 1:
                        rentals = _a.sent();
                        return [2 /*return*/, rentals];
                    case 2:
                        err_3 = _a.sent();
                        throw err_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RentalService.prototype.getRentalById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var rental, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Rental.findById(id).populate([
                                { path: 'store' },
                                { path: 'category' },
                                { path: 'store', populate: { path: 'user' } },
                            ])];
                    case 1:
                        rental = _a.sent();
                        return [2 /*return*/, rental];
                    case 2:
                        err_4 = _a.sent();
                        throw err_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    RentalService.prototype.deleteRentalById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Rental.findByIdAndDelete(id)];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result !== null];
                    case 2:
                        err_5 = _a.sent();
                        throw err_5;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return RentalService;
}());
exports.default = RentalService;
