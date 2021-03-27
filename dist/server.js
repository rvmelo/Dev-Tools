"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
require("./database");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var cors_1 = __importDefault(require("cors"));
var appError_1 = __importDefault(require("./errors/appError"));
var routes_1 = __importDefault(require("./routes"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(function (error, req, res, next) {
    if (error instanceof appError_1.default) {
        return res.status(error.statusCode).json({
            status: 'Error',
            message: error.message,
        });
    }
    return res.status(500).json({
        status: 'Error',
        message: 'Internal server error',
    });
});
app.listen(process.env.PORT || 3000, function () {
    return console.log('server started on port 3000');
});
