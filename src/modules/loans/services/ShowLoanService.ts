import { getCustomRepository } from "typeorm";
import APIError from "../../../../src/shared/errors/APIError";
import Loan from "../typeorm/entities/Loan";
import { LoanRepository } from "../typeorm/repositories/LoanRepository";


interface IRequest {
    loan_reference: string;
}

class ShowLoanService {
    public async execute({ loan_reference }: IRequest): Promise<Loan> {
        const loanRepository = getCustomRepository(LoanRepository);

        const loan = await loanRepository.findByLoanReference(loan_reference);

        if (!loan)
            throw new APIError("Loan not found.", 404);

        return loan;
    }
}

export default ShowLoanService;
