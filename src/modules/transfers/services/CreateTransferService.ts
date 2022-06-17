import { getCustomRepository } from "typeorm";
import APIError from "../../../shared/errors/APIError";
import GenerateReference from "../../../utils/GenerateReference";
import { AccountsRepository } from "../../accounts/typeorm/repositories/AccountsRepository";
import Transfer from "../typeorm/entities/Transfer";
import { TransferRepository } from "../typeorm/repositories/TransferRepository";

interface IRequest {
    amount: number;
    sender: string;
    receiver: string;
}

class CreateTransferService {
    public async execute({ amount, sender, receiver }: IRequest): Promise<Transfer> {
        const transferRepository = getCustomRepository(TransferRepository);
        const accountsRepository = getCustomRepository(AccountsRepository);

        const senderExist = await accountsRepository.findByAccountNumber(sender);

        if (!senderExist)
            throw new APIError('Sender account not found.', 404);

        if (senderExist.balance < amount)
            throw new APIError('Amount unavailable.');

        const receiverExist = await accountsRepository.findByAccountNumber(receiver);

        if (!receiverExist)
            throw new APIError('Receiver account not found.', 404);

        const transfer = transferRepository.create({
            transfer_reference: GenerateReference('transfer'),
            amount,
            sender_id: senderExist,
            receiver_id: receiverExist,
        });

        await transferRepository.save(transfer);

        return transfer;
    }
}

export default CreateTransferService;
