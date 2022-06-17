import { getCustomRepository } from "typeorm";
import APIError from "../../../shared/errors/APIError";
import Customer from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    name: string;
    email: string;
    phone: string;
    cpf: string;
    rg: string;
    birthdate: string;
}

class CreateCustomerService {
    public async execute({ name, email, phone, cpf, rg, birthdate }: IRequest): Promise<Customer> {
        const customersRepository = getCustomRepository(CustomersRepository);

        const equalEmail = await customersRepository.findByEmail(email);

        if (equalEmail)
            throw new APIError('There is already a customer with this email.');

        const customer = customersRepository.create({
            name,
            email,
            phone,
            rg,
            cpf,
            birthdate
        });

        await customersRepository.save(customer);

        return customer;
    }
}

export default CreateCustomerService;
