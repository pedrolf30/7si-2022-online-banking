import { Request, Response } from "express";
import CreateLoanService from "../services/CreateLoanService";
import ListLoansService from "../services/ListLoansService";
import ShowLoanService from "../services/ShowLoanService";

export default class LoanController {
    public async index(request: Request, response: Response): Promise<Response> {
        const { account_number } = request.account;
        const listLoans = new ListLoansService();

        const loans = await listLoans.execute({account_number});

        return response.json(loans);
    }

    public async show(request: Request, response: Response): Promise<Response> {
        const { loan_reference } = request.params;
        const showLoan = new ShowLoanService();

        const loan = await showLoan.execute({ loan_reference });

        return response.json(loan);
    }

    public async create(request: Request, response: Response): Promise<Response> {
        const { account_number } = request.account;
        const { amount, installments, finality } = request.body;
        const createLoan = new CreateLoanService();

        const loan = await createLoan.execute({
            amount,
            installments,
            finality,
            account_number,
        })

        return response.json(loan);
    }
}
