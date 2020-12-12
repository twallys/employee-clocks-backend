"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _typeorm = require("typeorm");

var _dateFns = require("date-fns");

var _AppointmentsRepository = _interopRequireDefault(require("../repositories/AppointmentsRepository"));

var _CreateAppointmentService = _interopRequireDefault(require("../services/CreateAppointmentService"));

var _UpdateAppointmentService = _interopRequireDefault(require("../services/UpdateAppointmentService"));

var _ensureAuthenticated = _interopRequireDefault(require("../middlewares/ensureAuthenticated"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable camelcase */
const appointmentsRouter = (0, _express.Router)(); // NESSA LINHA ESTOU DIZENDO QUE TODAS AS MINHAS ROTAS PRECISAM DE AUTH (TOKEN)

appointmentsRouter.use(_ensureAuthenticated.default);
appointmentsRouter.get('/', async (request, response) => {
  const appointmentsRepository = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.default);
  const appointments = await appointmentsRepository.find();
  return response.json(appointments);
});
appointmentsRouter.get('/:id', async (request, response) => {
  const {
    id
  } = request.params;
  const appointmentsRepository = (0, _typeorm.getCustomRepository)(_AppointmentsRepository.default);
  const appointment = await appointmentsRepository.findOne(id);
  return response.json(appointment);
});
appointmentsRouter.post('/', async (request, response) => {
  const {
    provider_id,
    date,
    clocks_in
  } = request.body;
  const parsedDate = (0, _dateFns.parseISO)(date);
  const createAppointment = new _CreateAppointmentService.default();
  const appointment = await createAppointment.execute({
    date: parsedDate,
    provider_id,
    clocks_in
  });
  return response.json(appointment);
});
appointmentsRouter.put('/:id', async (request, response) => {
  const {
    id
  } = request.params;
  const {
    clocks_out_lunch,
    clocks_in_lunch,
    clocks_out
  } = request.body;
  const updateAppointment = new _UpdateAppointmentService.default();
  const appointment = await updateAppointment.execute({
    id,
    clocks_out_lunch,
    clocks_in_lunch,
    clocks_out
  });
  return response.json(appointment);
});
var _default = appointmentsRouter;
exports.default = _default;