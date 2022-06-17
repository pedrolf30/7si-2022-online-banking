import { getCustomRepository } from "typeorm";
import APIError from "../../../../src/shared/errors/APIError";
import Transfer from "../typeorm/entities/Transfer";
import { TransferRepository } from "../typeorm/repositories/TransferRepository";


interface IRequest {
    transfer_reference: string;
}

class ShowTransferService {
    public async execute({ transfer_reference }: IRequest): Promise<Transfer> {
        const transferRepository = getCustomRepository(TransferRepository);

        const transfer = await transferRepository.findByTransferReference(transfer_reference);

        if (!transfer)
            throw new APIError("Transfer not found.", 404);

        return transfer;
    }
}

export default ShowTransferService;
