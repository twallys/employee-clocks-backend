/* eslint-disable camelcase */
import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';

import AppError from '../errors/AppError';

import uploadConfig from '../config/upload';
import User from '../models/User';

interface Request {
    user_id: string;
    avatarFilename: string;
}

class UpdateUserAvatarService {
    public async execute({ user_id, avatarFilename }: Request): Promise<User> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne(user_id);

        if (!user) {
            throw new AppError(
                'Only authenticated users can update Avatar',
                401,
            );
        }

        if (user.avatar) {
            // DELETAR AVATAR ANTERIOR

            // AQUI ESTOU JUNTANDO O DIRETORIO COM O NOME DO AVATAR
            const userAvatarFilePath = path.join(
                uploadConfig.directory,
                user.avatar,
            );

            // AQUI ESTOU VERIFICANDO SE O FILE EXISTE
            const userAvatarFileExists = await fs.promises.stat(
                userAvatarFilePath,
            );

            // SE EXISTIR ELE VAI DELETAR O AVATAR DA PASTA TEMP
            if (userAvatarFileExists) {
                await fs.promises.unlink(userAvatarFilePath);
            }
        }

        user.avatar = avatarFilename;

        // PODE SER UTILIZADO PARA ALTERAR, SE ELE TIVER ID, ELE ALTERA, SE NAO TIVER SALVA
        await usersRepository.save(user);

        return user;
    }
}

export default UpdateUserAvatarService;
