import { EntityRepository, Repository } from "typeorm";
import Account from "../entities/Account";

@EntityRepository(Account)
export class AccountsRepository extends Repository<Account> {
    public async findByAccountNumber(account_number: string): Promise<Account | undefined> {
        const account = this.findOne({
            where: {
                account_number,
            },
            relations: ['customer']
        })

        return account;
    }
}
