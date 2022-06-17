import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddSenderIdToTransfer1655471291833 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'tb_transfers',
            new TableColumn({
                name: 'sender_id',
                type: 'int',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'tb_transfers',
            new TableForeignKey({
                name: 'TransfersSender',
                columnNames: ['sender_id'],
                referencedTableName: 'tb_accounts',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tb_transfers', 'TransfersSender');
        await queryRunner.dropColumn('tb_transfers', 'sender_id');
    }

}
