/* eslint-disable camelcase */
import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    id: string;
    // provider_id: string;
    // date: Date;
    // clocks_in: string;
    clocks_out_lunch: string;
    clocks_in_lunch: string;
    clocks_out: string;
}

class UpdateAppointmentService {
    public async execute({
        id,
        // date,
        // provider_id,
        // clocks_in,
        clocks_out_lunch,
        clocks_in_lunch,
        clocks_out,
    }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointment = await appointmentsRepository.findOne(id);

        if (!appointment) {
            throw new AppError(
                'Try another appointment, it seems this does not exists!',
                401,
            );
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
        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default UpdateAppointmentService;
