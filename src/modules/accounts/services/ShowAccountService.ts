import { getCustomRepository } from "typeorm";
import APIError from "../../../../src/shared/errors/APIError";
import Account from "../typeorm/entities/Account";
import { AccountsRepository } from "../typeorm/repositories/AccountsRepository";

interface IRequest {
    account_number: string;
}

class ShowAccountService {
    public async execute({ account_number }: IRequest): Promise<Account> {
        const accountsRepository = getCustomRepository(AccountsRepository);

        const account = await accountsRepository.findByAccountNumber(account_number);

        if (!account)
            throw new APIError("Account not found.", 404);

        return account;
    }
}

export default ShowAccountService;
