"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _dateFns = require("date-fns");

var _typeorm = require("typeorm");

var _AppError = _interopRequireDefault(require("../errors/AppError"));

var _AppointmentsRepository = _interopRequireDefault(require("../repositories/AppointmentsRepository"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
class CreateAppointmentService {
  async execute({
    date,
    provider_id,
    clocks_in
  }) {
    const appointmentsRepository = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.default);
    const appointmentDate = (0, _dateFns.startOfHour)(date);
    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appointmentDate);

    if (findAppointmentInSameDate) {
      throw new _AppError.default('This appointment is already booked.');
    } // ESTE METODO VAI CRIAR UMA INSTANCIA, AINDA NÃO IRÁ SALVAR NO BANCO


    const appointment = appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
      clocks_in
    }); // ESSE MÉTODO EFETIVA O SALVAR, GRAVANDO NO BANCO DE DADOS

    await appointmentsRepository.save(appointment);
    return appointment;
  }

}

var _default = CreateAppointmentService;
exports.default = _default;