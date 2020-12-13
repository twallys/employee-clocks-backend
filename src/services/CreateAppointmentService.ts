/* eslint-disable camelcase */
import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';

// import AppError from '../errors/AppError';

import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    provider_id: string;
    date: Date;
    clocks_in: string;
}

class CreateAppointmentService {
    public async execute({
        date,
        provider_id,
        clocks_in,
    }: Request): Promise<Appointment> {
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const appointmentDate = startOfHour(date);

        // const findAppointmentInSameDate = await appointmentsRepository.findByDate(
        //     appointmentDate,
        // );

        // if (findAppointmentInSameDate) {
        //     throw new AppError('This appointment is already booked.');
        // }

        // ESTE METODO VAI CRIAR UMA INSTANCIA, AINDA NÃO IRÁ SALVAR NO BANCO
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
            clocks_in,
        });

        // ESSE MÉTODO EFETIVA O SALVAR, GRAVANDO NO BANCO DE DADOS
        await appointmentsRepository.save(appointment);

        return appointment;
    }
}

export default CreateAppointmentService;
