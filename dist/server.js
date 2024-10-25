"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var orders_1 = __importDefault(require("./handlers/orders"));
var users_1 = __importDefault(require("./handlers/users"));
var products_1 = __importDefault(require("./handlers/products"));
var dashboard_1 = __importDefault(require("./handlers/dashboard"));
var app = (0, express_1.default)();
exports.app = app;
var address = '0.0.0.0:3000';
app.use(body_parser_1.default.json());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
(0, orders_1.default)(app);
(0, users_1.default)(app);
(0, products_1.default)(app);
(0, dashboard_1.default)(app);
app.listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
