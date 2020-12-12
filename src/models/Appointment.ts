/* eslint-disable camelcase */
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';

import User from './User';

@Entity('appointments')
class Appointment {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column() // POR PADRÃO É VARCHAR
    provider_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'provider_id' })
    provider: User;

    @Column('timestamp with time zone')
    date: Date;

    @Column() // POR PADRÃO É VARCHAR
    clocks_in: string;

    @Column() // POR PADRÃO É VARCHAR
    clocks_out_lunch: string;

    @Column() // POR PADRÃO É VARCHAR
    clocks_in_lunch: string;

    @Column() // POR PADRÃO É VARCHAR
    clocks_out: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Appointment;
