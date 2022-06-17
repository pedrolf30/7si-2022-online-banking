import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddReceiverIdToTransfer1655472074837 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'tb_transfers',
            new TableColumn({
                name: 'receiver_id',
                type: 'int',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'tb_transfers',
            new TableForeignKey({
                name: 'TransfersReceiver',
                columnNames: ['receiver_id'],
                referencedTableName: 'tb_accounts',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tb_transfers', 'TransfersReceiver');
        await queryRunner.dropColumn('tb_transfers', 'receiver_id');
    }

}
