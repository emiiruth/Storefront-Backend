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
var server_1 = require("./../server");
var supertest_1 = __importDefault(require("supertest"));
var orders_1 = require("../models/orders");
var products_1 = require("../models/products");
var users_1 = require("../models/users");
var dashboard_1 = require("../services/dashboard");
var database_1 = __importDefault(require("../database"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var orderStore = new orders_1.OrderStore();
var productStore = new products_1.ProductStore();
var userStore = new users_1.UserStore();
var dashboardStore = new dashboard_1.DashboardQueries();
beforeAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var product, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 5, , 6]);
                return [4 /*yield*/, userStore.create({
                        first_name: 'emi',
                        last_name: 'ruth',
                        password_digest: 'test',
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, productStore.create({
                        name: 'testProduct',
                        price: '10',
                    })];
            case 2:
                product = _a.sent();
                return [4 /*yield*/, orderStore.create({ status: 'active', user_ID: 1 })];
            case 3:
                _a.sent();
                return [4 /*yield*/, orderStore.addProduct('1', '1', product.id)];
            case 4:
                _a.sent();
                return [3 /*break*/, 6];
            case 5:
                error_1 = _a.sent();
                console.log(error_1);
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); });
afterAll(function () { return __awaiter(void 0, void 0, void 0, function () {
    var conn, sql;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('AFTERALL RUNNING');
                return [4 /*yield*/, database_1.default.connect()];
            case 1:
                conn = _a.sent();
                sql = 'TRUNCATE orders, products, users CASCADE; ALTER SEQUENCE users_id_seq RESTART WITH 1; ALTER SEQUENCE orders_id_seq RESTART WITH 1; ALTER SEQUENCE products_id_seq RESTART WITH 1; ALTER SEQUENCE order_products_id_seq RESTART WITH 1';
                return [4 /*yield*/, conn.query(sql)];
            case 2:
                _a.sent();
                conn.release();
                return [2 /*return*/];
        }
    });
}); });
describe('Endpoint Tests', function () {
    describe('Users Endpoint Tests', function () {
        it('create should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var secret, token, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        secret = process.env.TOKEN_SECRET;
                        token = jsonwebtoken_1.default.sign({ first_name: 'firstname',
                            last_name: 'lastname', password_digest: 'passworddigest' }, secret);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                                .post('/users')
                                .set('Authorization', "Bearer ".concat(token))
                                .send({
                                first_name: 'firstname',
                                last_name: 'lastname',
                                password_digest: 'passworddigest',
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [3 /*break*/, 3];
                    case 2:
                        error_2 = _a.sent();
                        console.error('test Error:', error_2);
                        throw new Error("test Error: ".concat(error_2));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('get should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var secret, payload, token, response, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        secret = process.env.TOKEN_SECRET;
                        payload = {};
                        token = jsonwebtoken_1.default.sign(payload, secret);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/users')
                                .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200); //expect successful response
                        return [3 /*break*/, 3];
                    case 2:
                        error_3 = _a.sent();
                        console.error('test Error:', error_3);
                        throw new Error("test Error: ".concat(error_3));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('show should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var secret, payload, token, response, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        secret = process.env.TOKEN_SECRET;
                        payload = {};
                        token = jsonwebtoken_1.default.sign(payload, secret);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/users/1')
                                .set('Authorization', "Bearer ".concat(token))];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200); //expect successful response
                        return [3 /*break*/, 3];
                    case 2:
                        error_4 = _a.sent();
                        console.error('test Error:', error_4);
                        throw new Error("test Error: ".concat(error_4));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Products Endpoint Tests', function () {
        it('index get should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200); //expect successful response
                        return [3 /*break*/, 3];
                    case 2:
                        error_5 = _a.sent();
                        console.error('test Error:', error_5);
                        throw new Error("test Error: ".concat(error_5));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('show should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/products/1')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200); //expect successful response
                        return [3 /*break*/, 3];
                    case 2:
                        error_6 = _a.sent();
                        console.error('test Error:', error_6);
                        throw new Error("test Error: ".concat(error_6));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('create should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var secret, token, response, error_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        secret = process.env.TOKEN_SECRET;
                        token = jsonwebtoken_1.default.sign({ name: 'name',
                            price: '1' }, secret);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                                .post('/products')
                                .set('Authorization', "Bearer ".concat(token))
                                .send({
                                name: 'name',
                                price: '1',
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200);
                        return [3 /*break*/, 3];
                    case 2:
                        error_7 = _a.sent();
                        console.error('test Error:', error_7);
                        throw new Error("test Error: ".concat(error_7));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Orders Endpoint Tests', function () {
        it('index should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/orders')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200); //expect successful response
                        return [3 /*break*/, 3];
                    case 2:
                        error_8 = _a.sent();
                        console.error('test Error:', error_8);
                        throw new Error("test Error: ".concat(error_8));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('show should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/orders/1')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200); //expect successful response
                        return [3 /*break*/, 3];
                    case 2:
                        error_9 = _a.sent();
                        console.error('test Error:', error_9);
                        throw new Error("test Error: ".concat(error_9));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('create should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                                .post('/orders')
                                .send({
                                user_ID: '1',
                                status: 'active',
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200); //expect successful response
                        return [3 /*break*/, 3];
                    case 2:
                        error_10 = _a.sent();
                        console.error('test Error:', error_10);
                        throw new Error("test Error: ".concat(error_10));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('orders-products create should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app)
                                .post('/orders/1/products')
                                .send({
                                quantity: '1',
                                order_ID: '1',
                                product_ID: '1',
                            })];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200); //expect successful response
                        return [3 /*break*/, 3];
                    case 2:
                        error_11 = _a.sent();
                        console.error('test Error:', error_11);
                        throw new Error("test Error: ".concat(error_11));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('orders-products show should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/orders/1/products')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200); //expect successful response
                        return [3 /*break*/, 3];
                    case 2:
                        error_12 = _a.sent();
                        console.error('test Error:', error_12);
                        throw new Error("test Error: ".concat(error_12));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('Misc Endpoint Tests', function () {
        it('listUsers  should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/listusers')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200); //expect successful response
                        return [3 /*break*/, 3];
                    case 2:
                        error_13 = _a.sent();
                        console.error('test Error:', error_13);
                        throw new Error("test Error: ".concat(error_13));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('topFive should return a successful response', function () { return __awaiter(void 0, void 0, void 0, function () {
            var response, error_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, (0, supertest_1.default)(server_1.app).get('/topfive')];
                    case 1:
                        response = _a.sent();
                        expect(response.status).toBe(200); //expect successful response
                        return [3 /*break*/, 3];
                    case 2:
                        error_14 = _a.sent();
                        console.error('test Error:', error_14);
                        throw new Error("test Error: ".concat(error_14));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
});
describe('Database Action Tests', function () {
    describe('For Users Model', function () {
        it('should have a create method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(userStore.create).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('should create a user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userStore.create({
                                first_name: 'test first',
                                last_name: 'test last',
                                password_digest: 'test password',
                            })];
                    case 1:
                        result = _a.sent();
                        expect(result.first_name).toEqual('test first');
                        return [3 /*break*/, 3];
                    case 2:
                        error_15 = _a.sent();
                        console.error('test Error:', error_15);
                        throw new Error("test Error: ".concat(error_15));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('should have a show method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(userStore.show).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('should show the correct user', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, check, error_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userStore.show('1')];
                    case 1:
                        result = _a.sent();
                        check = result === null || result === void 0 ? void 0 : result.first_name;
                        expect(check).toEqual('emi');
                        return [3 /*break*/, 3];
                    case 2:
                        error_16 = _a.sent();
                        console.error('test Error:', error_16);
                        throw new Error("test Error: ".concat(error_16));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('should have an index method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(userStore.index).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('should return a list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, userStore.index()];
                    case 1:
                        result = _a.sent();
                        expect(Array.isArray(result)).toBe(true);
                        return [3 /*break*/, 3];
                    case 2:
                        error_17 = _a.sent();
                        console.error('test Error:', error_17);
                        throw new Error("test Error: ".concat(error_17));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('For Products Model', function () {
        it('should have a show method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(productStore.show).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('should show the correct product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, check, error_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, productStore.show('1')];
                    case 1:
                        result = _a.sent();
                        check = result === null || result === void 0 ? void 0 : result.name;
                        expect(check).toEqual('testProduct');
                        return [3 /*break*/, 3];
                    case 2:
                        error_18 = _a.sent();
                        console.error('test Error:', error_18);
                        throw new Error("test Error: ".concat(error_18));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('should have an index method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(productStore.index).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('should return a list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, productStore.index()];
                    case 1:
                        result = _a.sent();
                        expect(Array.isArray(result)).toBe(true);
                        return [3 /*break*/, 3];
                    case 2:
                        error_19 = _a.sent();
                        console.error('test Error:', error_19);
                        throw new Error("test Error: ".concat(error_19));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('should have a create method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(productStore.create).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('should create a product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, productStore.create({
                                name: 'test product',
                                price: '1',
                            })];
                    case 1:
                        result = _a.sent();
                        expect(result.name).toEqual('test product');
                        return [3 /*break*/, 3];
                    case 2:
                        error_20 = _a.sent();
                        console.error('test Error:', error_20);
                        throw new Error("test Error: ".concat(error_20));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('For Orders Model', function () {
        it('should have a show method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(orderStore.show).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('should show the correct order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, check, error_21;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, orderStore.show('1')];
                    case 1:
                        result = _a.sent();
                        check = result === null || result === void 0 ? void 0 : result.status;
                        expect(check).toEqual('active');
                        return [3 /*break*/, 3];
                    case 2:
                        error_21 = _a.sent();
                        console.error('test Error:', error_21);
                        throw new Error("test Error: ".concat(error_21));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('should have an index method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(orderStore.index).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('should return a list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_22;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, orderStore.index()];
                    case 1:
                        result = _a.sent();
                        expect(Array.isArray(result)).toBe(true);
                        return [3 /*break*/, 3];
                    case 2:
                        error_22 = _a.sent();
                        console.error('test Error:', error_22);
                        throw new Error("test Error: ".concat(error_22));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('should have a create method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(orderStore.create).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('should create an order', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_23;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, orderStore.create({
                                status: 'active',
                                user_ID: 1,
                            })];
                    case 1:
                        result = _a.sent();
                        expect(result.status).toEqual('active');
                        return [3 /*break*/, 3];
                    case 2:
                        error_23 = _a.sent();
                        console.error('test Error:', error_23);
                        throw new Error("test Error: ".concat(error_23));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('should have a addProduct method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(orderStore.addProduct).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('should add product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, propertyNames, error_24;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, orderStore.addProduct('1', '1', '1')];
                    case 1:
                        result = _a.sent();
                        propertyNames = Object.keys(result);
                        expect(propertyNames).toEqual([
                            'id',
                            'quantity',
                            'order_id',
                            'product_id',
                        ]);
                        return [3 /*break*/, 3];
                    case 2:
                        error_24 = _a.sent();
                        console.error('test Error:', error_24);
                        throw new Error("test Error: ".concat(error_24));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('should have a showProducts method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(orderStore.showProducts).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('should show added product', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, propertyNames, error_25;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, orderStore.showProducts('1')];
                    case 1:
                        result = _a.sent();
                        if (result !== null && result !== undefined) {
                            propertyNames = Object.keys(result);
                            expect(propertyNames).toEqual([
                                'id',
                                'status',
                                'user_id',
                                'quantity',
                                'order_id',
                                "product_id"
                            ]);
                        }
                        else {
                            console.error('null error');
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        error_25 = _a.sent();
                        console.error('test Error:', error_25);
                        throw new Error("test Error: ".concat(error_25));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
    describe('For Dashboards Service', function () {
        it('should have a topFive method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(dashboardStore.topFive).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('topFive should return list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_26;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dashboardStore.topFive()];
                    case 1:
                        result = _a.sent();
                        expect(Array.isArray(result)).toBe(true);
                        return [3 /*break*/, 3];
                    case 2:
                        error_26 = _a.sent();
                        console.error('test Error:', error_26);
                        throw new Error("test Error: ".concat(error_26));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
        it('should have a listUsers method', function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    expect(dashboardStore.listUsers).toBeDefined();
                }
                catch (error) {
                    console.error('test Error:', error);
                    throw new Error("test Error: ".concat(error));
                }
                return [2 /*return*/];
            });
        }); });
        it('listUsers should return list', function () { return __awaiter(void 0, void 0, void 0, function () {
            var result, error_27;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, dashboardStore.listUsers()];
                    case 1:
                        result = _a.sent();
                        expect(Array.isArray(result)).toBe(true);
                        return [3 /*break*/, 3];
                    case 2:
                        error_27 = _a.sent();
                        console.error('test Error:', error_27);
                        throw new Error("test Error: ".concat(error_27));
                    case 3: return [2 /*return*/];
                }
            });
        }); });
    });
});
