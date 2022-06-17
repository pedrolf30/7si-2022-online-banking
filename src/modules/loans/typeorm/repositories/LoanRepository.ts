import { EntityRepository, Repository } from "typeorm";
import Loan from "../entities/Loan";

@EntityRepository(Loan)
export class LoanRepository extends Repository<Loan> {
    public async findByLoanReference(loan_reference: string): Promise<Loan | undefined> {
        const loan = this.findOne({
            where: {
                loan_reference,
            },
        })

        return loan;
    }
}
