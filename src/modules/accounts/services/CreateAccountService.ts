import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import Account from "../typeorm/entities/Account";
import { AccountsRepository } from "../typeorm/repositories/AccountsRepository";
import APIError from "../../../shared/errors/APIError";
import GenerateAccountNumber from "../../../utils/GenerateAccountNumber";
import { CustomersRepository } from "../../customers/typeorm/repositories/CustomersRepository";

interface IRequest {
    password: string;
    password_2: string;
    account_type: string;
    customer_id: number;
}

class CreateAccountService {
    public async execute({ password, password_2, account_type, customer_id }: IRequest): Promise<Account> {
        const accountsRepository = getCustomRepository(AccountsRepository);
        const customersRepository = getCustomRepository(CustomersRepository);

        const customerExists = await customersRepository.findOne(customer_id);

        const equalPasswords = password === password_2 ? true : false;

        if (equalPasswords === false)
            throw new APIError('Passwords does not match');

        const hashedPassword = await hash(password, 8);

        const account = accountsRepository.create({
            account_number: GenerateAccountNumber(),
            account_type,
            password: hashedPassword,
            balance: 0.0,
            customer: customerExists,
        });

        await accountsRepository.save(account);

        return account;
    }
}

export default CreateAccountService;
