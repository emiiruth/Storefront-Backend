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
var orders_1 = require("../models/orders");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var orderRoutes = function (app) {
    app.post('/orders', create);
    app.get('/orders', index);
    app.get('/orders/:id', show);
    app.post('/orders/:id/products', addProduct);
    app.get('/orders/:user_ID/products', showProducts);
};
var orderStore = new orders_1.OrderStore();
var create = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, newOrder, secretKey, token, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                order = {
                    user_ID: _req.body.user_ID,
                    status: 'active',
                };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, orderStore.create(order)];
            case 2:
                newOrder = _a.sent();
                secretKey = process.env.TOKEN_SECRET;
                token = jsonwebtoken_1.default.sign({ order: newOrder }, secretKey);
                res.json(token);
                return [3 /*break*/, 4];
            case 3:
                err_1 = _a.sent();
                console.error('Error creating order:', err_1);
                res.status(400);
                res.json(err_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var index = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orders, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderStore.index()];
            case 1:
                orders = _a.sent();
                res.json(orders);
                return [3 /*break*/, 3];
            case 2:
                error_1 = _a.sent();
                console.error('index Error:', error_1);
                throw new Error("index Error: ".concat(error_1));
            case 3: return [2 /*return*/];
        }
    });
}); };
var show = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderStore.show(_req.params.id)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                console.error('show Error:', error_2);
                throw new Error("show Error: ".concat(error_2));
            case 3: return [2 /*return*/];
        }
    });
}); };
var addProduct = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var quantity, product_ID, order_ID, addedProduct, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                quantity = _req.body.quantity;
                product_ID = _req.body.product_ID;
                order_ID = _req.params.id;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, orderStore.addProduct(quantity, order_ID, product_ID)];
            case 2:
                addedProduct = _a.sent();
                res.json(addedProduct);
                return [3 /*break*/, 4];
            case 3:
                err_2 = _a.sent();
                res.status(400);
                res.json(err_2);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
var showProducts = function (_req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var order, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, orderStore.showProducts(_req.params.user_ID)];
            case 1:
                order = _a.sent();
                res.json(order);
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                console.error('showProducts Error:', error_3);
                throw new Error("showProducts Error: ".concat(error_3));
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.default = orderRoutes;
