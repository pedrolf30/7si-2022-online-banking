import { getCustomRepository } from "typeorm";
import APIError from "../../../shared/errors/APIError";
import { AccountsRepository } from "../../accounts/typeorm/repositories/AccountsRepository";
import Loan from "../typeorm/entities/Loan";
import { LoanRepository } from "../typeorm/repositories/LoanRepository";

interface IRequest {
    account_number: string;
}


class ListLoansService {
    public async execute({ account_number }: IRequest): Promise<Loan[]> {
        const loanRepository = getCustomRepository(LoanRepository);
        const accountsRepository = getCustomRepository(AccountsRepository);

        const account = await accountsRepository.findByAccountNumber(account_number);

        if (!account)
            throw new APIError('Account not found.', 404);


        const loans = await loanRepository.find({ where: { requester_id: account.id }});

        return loans;
    }
}

export default ListLoansService;
