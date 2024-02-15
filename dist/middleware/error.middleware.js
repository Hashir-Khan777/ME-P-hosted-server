"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function errorMiddleware(error, req, res, _next) {
    var status = error.status || 500;
    var message = error.message || 'Something went wrong';
    res.status(status).send({
        status: status,
        message: message,
    });
}
exports.default = errorMiddleware;
