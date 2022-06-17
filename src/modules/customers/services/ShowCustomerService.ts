import { getCustomRepository } from "typeorm";
import APIError from "../../../../src/shared/errors/APIError";
import { AccountsRepository } from "../../accounts/typeorm/repositories/AccountsRepository";
import Customer from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    account_number: string;
}

class ShowCustomerService {
    public async execute({ account_number }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);
        const accountsRepository = getCustomRepository(AccountsRepository);

        const account = await accountsRepository.findByAccountNumber(account_number)

        if (!account)
            throw new APIError("Customer not found.", 404);

        const customer = await customersRepository.findOne(account?.customer.id);

        if (!customer)
            throw new APIError("Customer not found.", 404);

        return customer;
    }
}

export default ShowCustomerService;
