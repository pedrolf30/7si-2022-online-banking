import { hash } from "bcryptjs";
import { getCustomRepository } from "typeorm";
import APIError from "../../../shared/errors/APIError";
import Account from "../typeorm/entities/Account";
import { AccountsRepository } from "../typeorm/repositories/AccountsRepository";

interface IRequest {
    account_number: string;
    password: string;
    password_2: string;
}

class UpdateAccountService {
    public async execute({ account_number, password, password_2 }: IRequest): Promise<Account> {
        const accountsRepository = getCustomRepository(AccountsRepository);

        const account = await accountsRepository.findByAccountNumber(account_number);

        if (!account)
            throw new APIError("Account not found.", 404);

        const equalPasswords = password === password_2 ? true : false;

        if (equalPasswords === false)
            throw new APIError('Passwords does not match');

        const hashedPassword = await hash(password, 8);

        account.password = hashedPassword;

        await accountsRepository.save(account);

        return account;
    }
}

export default UpdateAccountService;
