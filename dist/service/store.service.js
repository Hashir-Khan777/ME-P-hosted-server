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
var store_model_1 = __importDefault(require("../model/store.model"));
var auth_model_1 = __importDefault(require("../model/auth.model"));
var StoreService = /** @class */ (function () {
    function StoreService() {
        this.Store = store_model_1.default;
        this.User = auth_model_1.default;
    }
    StoreService.prototype.createStore = function (user, country, state, area, postalCode, address, name, paymentScreenShot, pricingPlan, phoneNumber) {
        return __awaiter(this, void 0, void 0, function () {
            var Store_1, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.Store.create({
                                user: user,
                                country: country,
                                state: state,
                                area: area,
                                postalCode: postalCode,
                                address: address,
                                name: name,
                                paymentScreenShot: paymentScreenShot,
                                pricingPlan: pricingPlan,
                                phoneNumber: phoneNumber,
                            })];
                    case 1:
                        Store_1 = _a.sent();
                        return [4 /*yield*/, this.User.findByIdAndUpdate({ _id: user }, { $addToSet: { roles: 'seller' } }, { new: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, Store_1];
                    case 3:
                        err_1 = _a.sent();
                        throw err_1;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    StoreService.prototype.getStores = function () {
        return __awaiter(this, void 0, void 0, function () {
            var Stores, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Store.find({})];
                    case 1:
                        Stores = _a.sent();
                        return [2 /*return*/, Stores];
                    case 2:
                        err_2 = _a.sent();
                        throw err_2;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StoreService.prototype.getStoreByUserId = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var Store_2, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Store.findOne({ user: userId })];
                    case 1:
                        Store_2 = _a.sent();
                        return [2 /*return*/, Store_2];
                    case 2:
                        err_3 = _a.sent();
                        throw err_3;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    StoreService.prototype.approveStore = function (_id) {
        return __awaiter(this, void 0, void 0, function () {
            var Stores, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, this.Store.findOneAndUpdate({ _id: _id }, { approve: true }, { new: true })];
                    case 1:
                        Stores = _a.sent();
                        return [2 /*return*/, Stores];
                    case 2:
                        err_4 = _a.sent();
                        throw err_4;
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return StoreService;
}());
exports.default = StoreService;
