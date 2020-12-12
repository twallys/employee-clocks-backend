"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _AppointmentsRepository = _interopRequireDefault(require("../repositories/AppointmentsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
class UpdateAppointmentService {
  async execute({
    id,
    // date,
    // provider_id,
    // clocks_in,
    clocks_out_lunch,
    clocks_in_lunch,
    clocks_out
  }) {
    const appointmentsRepository = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.default);
    const appointment = await appointmentsRepository.findOne(id);

    if (!appointment) {
      throw new _AppError.default('Try another appointment, it seems this does not exists!', 401);
    }

    if (clocks_out_lunch) {
      appointment.clocks_out_lunch = clocks_out_lunch;
    }

    if (clocks_in_lunch) {
      appointment.clocks_in_lunch = clocks_in_lunch;
    }

    if (clocks_out) {
      appointment.clocks_out = clocks_out;
    } // PODE SER UTILIZADO PARA ALTERAR, SE ELE TIVER ID, ELE ALTERA, SE NAO TIVER SALVA


    await appointmentsRepository.save(appointment);
    return appointment;
  }

}

var _default = UpdateAppointmentService;
exports.default = _default;