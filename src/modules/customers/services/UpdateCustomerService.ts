import { getCustomRepository } from "typeorm";
import APIError from "../../../shared/errors/APIError";
import Customer from "../typeorm/entities/Customer";
import { CustomersRepository } from "../typeorm/repositories/CustomersRepository";

interface IRequest {
    searchEmail: string;
    name: string;
    email: string;
    phone: string;
    rg: string;
    cpf: string;
    birthdate: string;
}

class UpdateCustomerService {
    public async execute({ searchEmail, name, email, phone, rg, cpf, birthdate }: IRequest): Promise<Customer> {
        const customerRepository = getCustomRepository(CustomersRepository);

        const customer = await customerRepository.findByEmail(searchEmail);

        if (!customer)
            throw new APIError("Customer not found.", 404);

        if (searchEmail !== email) {
            const invalidEmail = await customerRepository.findByEmail(email);

            if (invalidEmail)
                throw new APIError("There is already a customer with this email.");
        }

        customer.name = name;
        customer.email = email;
        customer.phone = phone;
        customer.rg = rg;
        customer.cpf = cpf;
        customer.birthdate = birthdate;

        await customerRepository.save(customer);

        return customer;
    }
}

export default UpdateCustomerService;
