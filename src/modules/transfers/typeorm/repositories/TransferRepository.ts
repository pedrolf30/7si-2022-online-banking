import { EntityRepository, Repository } from "typeorm";
import Transfer from "../entities/Transfer";

@EntityRepository(Transfer)
export class TransferRepository extends Repository<Transfer> {
    public async findByTransferReference(transfer_reference: string): Promise<Transfer | undefined> {
        const transfer = this.findOne({
            where: [{ transfer_reference }],
            relations: ['sender_id', 'receiver_id', 'sender_id.customer', 'receiver_id.customer']
        })

        return transfer;
    }

    public async findByAccountId(id: number): Promise<Transfer[]> {
    const transfers = await this.find({
      where: [{ sender_id: id }, { receiver_id: id }],
      order: {
        transferred_at: 'DESC',
      },
      relations: ['sender_id', 'receiver_id', 'sender_id.customer', 'receiver_id.customer']
    });

    return transfers;
  }
}
