/* eslint-disable camelcase */
import { Router } from 'express';
import { getCustomRepository } from 'typeorm';
import { parseISO } from 'date-fns';

import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import UpdateAppointmentService from '../services/UpdateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentsRouter = Router();

// NESSA LINHA ESTOU DIZENDO QUE TODAS AS MINHAS ROTAS PRECISAM DE AUTH (TOKEN)
appointmentsRouter.use(ensureAuthenticated);

appointmentsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();

    return response.json(appointments);
});

appointmentsRouter.get('/:id', async (request, response) => {
    const { id } = request.params;
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointment = await appointmentsRepository.findOne(id);

    return response.json(appointment);
});

appointmentsRouter.post('/', async (request, response) => {
    const { provider_id, date, clocks_in } = request.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService();

    const appointment = await createAppointment.execute({
        date: parsedDate,
        provider_id,
        clocks_in,
    });

    return response.json(appointment);
});

appointmentsRouter.put('/:id', async (request, response) => {
    const { id } = request.params;
    const { clocks_out_lunch, clocks_in_lunch, clocks_out } = request.body;

    const updateAppointment = new UpdateAppointmentService();

    const appointment = await updateAppointment.execute({
        id,
        clocks_out_lunch,
        clocks_in_lunch,
        clocks_out,
    });

    return response.json(appointment);
});

export default appointmentsRouter;
