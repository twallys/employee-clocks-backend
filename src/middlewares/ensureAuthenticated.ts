import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

import AppError from '../errors/AppError';

import AuthConfig from '../config/auth';

interface TokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export default function ensureAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    // VALIDACAO DO TOKEN JWT

    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new AppError('JWT token is missing', 401);
    }

    // Bearer Token

    const [, token] = authHeader.split(' ');

    try {
        const decoded = verify(token, AuthConfig.jwt.secret);

        const { sub } = decoded as TokenPayload;

        // DESSA FORMA O ID DO USUARIO FICA DISPONIVEL NO REQUEST EM TODAS AS ROTAS QUE USAM O JWT
        request.user = {
            id: sub,
        };

        return next();
    } catch (err) {
        throw new AppError('Invalid JWT Token', 401);
    }
}
