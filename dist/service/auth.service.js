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
var auth_model_1 = __importDefault(require("../model/auth.model"));
var http_exception_1 = __importDefault(require("../utils/http.exception"));
var bcrypt_1 = __importDefault(require("bcrypt"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var AuthService = /** @class */ (function () {
    function AuthService() {
        this.User = auth_model_1.default;
    }
    AuthService.prototype.registerUser = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var dup, hashedPassword, user, token, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        return [4 /*yield*/, this.User.findOne({ email: email })];
                    case 1:
                        dup = _a.sent();
                        if (dup) {
                            throw new http_exception_1.default(409, 'Email already registered');
                        }
                        return [4 /*yield*/, bcrypt_1.default.hash(password, 10)];
                    case 2:
                        hashedPassword = _a.sent();
                        return [4 /*yield*/, this.User.create({
                                email: email,
                                password: hashedPassword,
                                roles: ['user'],
                            })];
                    case 3:
                        user = _a.sent();
                        token = jsonwebtoken_1.default.sign({ user: user }, 'your-secret-key', {
                            expiresIn: '30d',
                        });
                        return [2 /*return*/, { user: user, token: token }];
                    case 4:
                        err_1 = _a.sent();
                        throw err_1;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.loginUser = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var user, passwordMatch, token, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, this.User.findOne({ email: email })];
                    case 1:
                        user = _a.sent();
                        if (!user) {
                            throw new http_exception_1.default(409, 'User with the given email does not exist');
                        }
                        return [4 /*yield*/, bcrypt_1.default.compare(password, user.password)];
                    case 2:
                        passwordMatch = _a.sent();
                        if (!passwordMatch) {
                            throw new http_exception_1.default(401, 'Invalid Credentials');
                        }
                        token = jsonwebtoken_1.default.sign({ user: user }, 'your-secret-key', {
                            expiresIn: '30d',
                        });
                        return [2 /*return*/, { user: user, token: token }];
                    case 3:
                        err_2 = _a.sent();
                        throw err_2;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.verifyUser = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var userModel, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        if (!user) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.User.findOne({
                                _id: user === null || user === void 0 ? void 0 : user._id,
                            })];
                    case 1:
                        userModel = _a.sent();
                        return [2 /*return*/, userModel];
                    case 2: throw new http_exception_1.default(401, 'Please register yourself');
                    case 3:
                        err_3 = _a.sent();
                        throw err_3;
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return AuthService;
}());
exports.default = AuthService;
