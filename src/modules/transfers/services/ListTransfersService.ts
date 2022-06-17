import { getCustomRepository } from "typeorm";
import APIError from "../../../shared/errors/APIError";
import { AccountsRepository } from "../../accounts/typeorm/repositories/AccountsRepository";
import Transfer from "../typeorm/entities/Transfer";
import { TransferRepository } from "../typeorm/repositories/TransferRepository";

interface IRequest {
  account_number: string;
}

class ListTransfersService {
    public async execute({ account_number }: IRequest): Promise<Transfer[]> {
        const transferRepository = getCustomRepository(TransferRepository);
        const accountsRepository = getCustomRepository(AccountsRepository);

        const account = await accountsRepository.findByAccountNumber(account_number);

        if (!account)
            throw new APIError('Account not found.', 404);

        const transfers = await transferRepository.findByAccountId(account.id);



        return transfers;
    }
}

export default ListTransfersService;
