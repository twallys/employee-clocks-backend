import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import AuthConfig from '../config/auth';

import AppError from '../errors/AppError';

import User from '../models/User';

interface Request {
    email: string;
    password: string;
}

interface Response {
    user: User;
    token: string;
}

class AuthenticateUserService {
    public async execute({ email, password }: Request): Promise<Response> {
        const usersRepository = getRepository(User);

        const user = await usersRepository.findOne({ where: { email } });

        if (!user) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        const passwordMatched = await compare(password, user.password);

        if (!passwordMatched) {
            throw new AppError('Incorrect email/password combination.', 401);
        }

        // COMO PARAMETROS O SIGN PODE RECEBER
        // PAYLOAD => SÃO INFORMAÇÕES QUE TALVEZ QUEIRAMOS PASSAR(ID DO USUARIO, EMAIL ETC)
        // SECRET =>  SERVE COMO CHAVE PARA DESCRIPTOGRAFAR (USAR O SITE MD5 ONLINE)
        const token = sign({}, AuthConfig.jwt.secret, {
            subject: user.id,
            expiresIn: AuthConfig.jwt.expiresIn,
        });

        return {
            user,
            token,
        };
    }
}
export default AuthenticateUserService;
