"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _Appointment = _interopRequireDefault(require("../models/Appointment"));

var _dec, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let // AQUI ESTA LINHA VAI CONECTAR COM O REPOSITORIO
AppointmentsRepository = (_dec = (0, _typeorm.EntityRepository)(_Appointment.default), _dec(_class = class AppointmentsRepository extends _typeorm.Repository {
  async findByDate(date) {
    const findAppointment = await this.findOne({
      where: {
        date
      }
    });
    return findAppointment || null;
  }

}) || _class);
var _default = AppointmentsRepository;
exports.default = _default;