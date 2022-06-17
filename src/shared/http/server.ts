import 'reflect-metadata';
import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { errors } from 'celebrate';
import { pagination } from 'typeorm-pagination';
import routes from './routes';
import APIError from '../errors/APIError';
import '../typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(pagination);

app.use(routes);

app.use(errors());

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
    if (error instanceof APIError) {
        return response.status(error.statusCode).json({
            status: error.statusCode,
            message: error.message,
        })
    }

    return response.status(500).json({
        status: 500,
        message: 'Internal server error'
    })
});

app.listen(process.env.API_PORT, () => {
    console.log('Server started on port 3333!');
});

