import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import APIError from '../../errors/APIError';
import authConfig from '../../../config/auth';

interface ITokenPayLoad {
    iat: number;
    ext: number;
    sub: string;
}

export default function isAuthenticated(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
        throw new APIError('JWT Token is missing.');
    }

    const [, token] = authHeader.split(' ');

    try {
        const decodedToken = verify(token, authConfig.jwt.secret);

        const { sub } = decodedToken as ITokenPayLoad;

        request.account = {
            account_number: sub
        }

        return next();
    } catch {
        throw new APIError('Invalid JWT Token.');
    }
}
