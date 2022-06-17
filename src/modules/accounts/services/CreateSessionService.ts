import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import Account from "../typeorm/entities/Account";
import { AccountsRepository } from "../typeorm/repositories/AccountsRepository";
import APIError from "../../../shared/errors/APIError";

interface IRequest {
    account_number: string;
    password: string;
}

interface IResponse {
    account: Account;
    token: string;
}

class CreateSessionService {
    public async execute({ account_number, password }: IRequest): Promise<IResponse> {
        const accountsRepository = getCustomRepository(AccountsRepository);

        const account = await accountsRepository.findByAccountNumber(account_number);

        if (!account) {
            throw new APIError('Incorrect account number/password combination.', 401);
        }

        const passwordConfirmation = await compare(password, account.password);

        if (!passwordConfirmation) {
            throw new APIError('Incorrect account number/password combination.', 401);
        }

        const token = sign({}, authConfig.jwt.secret, {
            subject: account.account_number,
            expiresIn: authConfig.jwt.expiresIn,
        });

        return {
            account,
            token,
        };
    }
}

export default CreateSessionService;
