import { Request, Response } from "express";
import CreateAccountService from "../services/CreateAccountService";
import ShowAccountService from "../services/ShowAccountService";
import UpdateAccountService from "../services/UpdateAccountService";

export default class AccountsController {
    public async show(request: Request, response: Response): Promise<Response> {
        const { account_number } = request.account;
        const showAccount = new ShowAccountService();

        const account = await showAccount.execute({ account_number });

        return response.json(account);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { password, password_2, account_type, customer_id } = request.body;

        const createAccount = new CreateAccountService();

        const account = await createAccount.execute({
            password,
            password_2,
            account_type,
            customer_id,
        })

        return response.json(account);
    }

     public async update(request: Request, response: Response): Promise<Response> {
        const { account_number } = request.account;
        const { password, password_2 } = request.body;

        const updateAccount = new UpdateAccountService();

        const account = await updateAccount.execute({
            account_number,
            password,
            password_2,
        })

        return response.json(account);
    }
}
