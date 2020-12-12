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
        while (_) try {
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
/* eslint-disable camelcase */
var express_1 = require("express");
var typeorm_1 = require("typeorm");
var date_fns_1 = require("date-fns");
var AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
var CreateAppointmentService_1 = __importDefault(require("../services/CreateAppointmentService"));
var UpdateAppointmentService_1 = __importDefault(require("../services/UpdateAppointmentService"));
var ensureAuthenticated_1 = __importDefault(require("../middlewares/ensureAuthenticated"));
var appointmentsRouter = express_1.Router();
// NESSA LINHA ESTOU DIZENDO QUE TODAS AS MINHAS ROTAS PRECISAM DE AUTH (TOKEN)
appointmentsRouter.use(ensureAuthenticated_1.default);
appointmentsRouter.get('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var appointmentsRepository, appointments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                appointmentsRepository = typeorm_1.getCustomRepository(AppointmentsRepository_1.default);
                return [4 /*yield*/, appointmentsRepository.find()];
            case 1:
                appointments = _a.sent();
                return [2 /*return*/, response.json(appointments)];
        }
    });
}); });
appointmentsRouter.get('/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, appointmentsRepository, appointment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = request.params.id;
                appointmentsRepository = typeorm_1.getCustomRepository(AppointmentsRepository_1.default);
                return [4 /*yield*/, appointmentsRepository.findOne(id)];
            case 1:
                appointment = _a.sent();
                return [2 /*return*/, response.json(appointment)];
        }
    });
}); });
appointmentsRouter.post('/', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, provider_id, date, clocks_in, parsedDate, createAppointment, appointment;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _a = request.body, provider_id = _a.provider_id, date = _a.date, clocks_in = _a.clocks_in;
                parsedDate = date_fns_1.parseISO(date);
                createAppointment = new CreateAppointmentService_1.default();
                return [4 /*yield*/, createAppointment.execute({
                        date: parsedDate,
                        provider_id: provider_id,
                        clocks_in: clocks_in,
                    })];
            case 1:
                appointment = _b.sent();
                return [2 /*return*/, response.json(appointment)];
        }
    });
}); });
appointmentsRouter.put('/:id', function (request, response) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, clocks_out_lunch, clocks_in_lunch, clocks_out, updateAppointment, appointment;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                id = request.params.id;
                _a = request.body, clocks_out_lunch = _a.clocks_out_lunch, clocks_in_lunch = _a.clocks_in_lunch, clocks_out = _a.clocks_out;
                updateAppointment = new UpdateAppointmentService_1.default();
                return [4 /*yield*/, updateAppointment.execute({
                        id: id,
                        clocks_out_lunch: clocks_out_lunch,
                        clocks_in_lunch: clocks_in_lunch,
                        clocks_out: clocks_out,
                    })];
            case 1:
                appointment = _b.sent();
                return [2 /*return*/, response.json(appointment)];
        }
    });
}); });
exports.default = appointmentsRouter;
