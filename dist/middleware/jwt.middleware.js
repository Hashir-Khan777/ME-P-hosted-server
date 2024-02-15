"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuth = void 0;
var jwt = require('jsonwebtoken');
var isAuth = function (req, res, next) {
    var authorization = req.headers.authorization;
    var token = authorization === null || authorization === void 0 ? void 0 : authorization.slice(7, authorization.length);
    if (token) {
        jwt.verify(token, 'your-secret-key', function (err, user) {
            if (err) {
                res.status(401).send({ message: 'Please login' });
            }
            else {
                req.user = user.user;
                next();
            }
        });
    }
    else {
        res.status(401).send({ message: 'Please login' });
    }
};
exports.isAuth = isAuth;
