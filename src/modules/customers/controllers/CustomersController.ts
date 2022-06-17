import { Request, Response } from "express";
import CreateCustomerService from "../services/CreateCustomerService";
import ShowCustomerService from "../services/ShowCustomerService";
import UpdateCustomerService from "../services/UpdateCustomerService";

export default class CustomersController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { account_number } = request.account;
        const showCustomer = new ShowCustomerService();

        const customer = await showCustomer.execute({ account_number });

        return response.json(customer);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { name, email, phone, cpf, rg, birthdate } = request.body;

        const createCustomer = new CreateCustomerService();

        const customer = await createCustomer.execute({
            name,
            email,
            phone,
            cpf,
            rg,
            birthdate,
        })

        return response.json(customer);
    }

     public async update(request: Request, response: Response): Promise<Response> {
        const { searchEmail } = request.params;
        const { name, email, phone, cpf, rg, birthdate } = request.body;

        const updateCustomer = new UpdateCustomerService();

        const customer = await updateCustomer.execute({
            searchEmail,
            name,
            email,
            phone,
            cpf,
            rg,
            birthdate,
        })

        return response.json(customer);
    }
}
