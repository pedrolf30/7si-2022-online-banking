import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateTransfers1655216352066 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tb_transfers',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    generationStrategy: "increment"
                },
                {
                    name: 'transfer_reference',
                    type: 'varchar',
                },
                {
                    name: 'amount',
                    type: 'decimal',
                    precision: 10,
                    scale: 2,
                },
                {
                    name: 'transferred_at',
                    type: 'timestamp',
                    default: 'now()'
                },
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('tb_transfers');
    }

}
