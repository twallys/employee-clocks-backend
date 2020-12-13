import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import uploadConfig from './config/upload';
import AppError from './errors/AppError';

import './database';

const app = express();

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    app.use(cors());
    next();
});

app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

// USADO PARA TRATAR OS ERROS, DEVE ESTAR DEPOIS DAS ROTAS
// PARA FUNCIONAR EXIGE O PACOTE EXPRESS-ASYNC-ERRORS
app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
    // VERIFICA SE O ERRO FOI ORIGINADO DO APPERROR, OU SEJA, É UM ERRO QUE EU CONHECO
    if (err instanceof AppError) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }

    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});

app.listen(3333, () => {
    console.log('🚀 Server started on port 3333');
});
