import { getCustomRepository } from "typeorm";
import APIError from "../../../shared/errors/APIError";
import GenerateReference from "../../../utils/GenerateReference";
import { LoanRepository } from "../typeorm/repositories/LoanRepository";
import Loan from "../typeorm/entities/Loan";
import { AccountsRepository } from "../../accounts/typeorm/repositories/AccountsRepository";

interface IRequest {
    account_number: string;
    amount: number;
    installments: number;
    finality: string;
}

class CreateLoanService {
    public async execute({ amount, installments, finality, account_number }: IRequest): Promise<Loan> {
        const loanRepository = getCustomRepository(LoanRepository);
        const accountsRepository = getCustomRepository(AccountsRepository);

        const requesterExist = await accountsRepository.findByAccountNumber(account_number)

        if (!requesterExist)
            throw new APIError('Account not found.', 404);

        const loan = loanRepository.create({
            loan_reference: GenerateReference('loan'),
            requester_id: requesterExist,
            amount,
            installments,
            finality,
            status: 'under_review'
        });

        await loanRepository.save(loan);

        return loan;
    }
}

export default CreateLoanService;
