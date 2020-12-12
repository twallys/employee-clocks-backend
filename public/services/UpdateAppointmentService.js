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
var typeorm_1 = require("typeorm");
var AppError_1 = __importDefault(require("../errors/AppError"));
var AppointmentsRepository_1 = __importDefault(require("../repositories/AppointmentsRepository"));
var UpdateAppointmentService = /** @class */ (function () {
    function UpdateAppointmentService() {
    }
    UpdateAppointmentService.prototype.execute = function (_a) {
        var id = _a.id, 
        // date,
        // provider_id,
        // clocks_in,
        clocks_out_lunch = _a.clocks_out_lunch, clocks_in_lunch = _a.clocks_in_lunch, clocks_out = _a.clocks_out;
        return __awaiter(this, void 0, void 0, function () {
            var appointmentsRepository, appointment;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        appointmentsRepository = typeorm_1.getCustomRepository(AppointmentsRepository_1.default);
                        return [4 /*yield*/, appointmentsRepository.findOne(id)];
                    case 1:
                        appointment = _b.sent();
                        if (!appointment) {
                            throw new AppError_1.default('Try another appointment, it seems this does not exists!', 401);
                        }
                        if (clocks_out_lunch) {
                            appointment.clocks_out_lunch = clocks_out_lunch;
                        }
                        if (clocks_in_lunch) {
                            appointment.clocks_in_lunch = clocks_in_lunch;
                        }
                        if (clocks_out) {
                            appointment.clocks_out = clocks_out;
                        }
                        // PODE SER UTILIZADO PARA ALTERAR, SE ELE TIVER ID, ELE ALTERA, SE NAO TIVER SALVA
                        return [4 /*yield*/, appointmentsRepository.save(appointment)];
                    case 2:
                        // PODE SER UTILIZADO PARA ALTERAR, SE ELE TIVER ID, ELE ALTERA, SE NAO TIVER SALVA
                        _b.sent();
                        return [2 /*return*/, appointment];
                }
            });
        });
    };
    return UpdateAppointmentService;
}());
exports.default = UpdateAppointmentService;
