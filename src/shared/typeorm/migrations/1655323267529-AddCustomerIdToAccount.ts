import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCustomerIdToAccount1655323267529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'tb_accounts',
            new TableColumn({
                name: 'customer_id',
                type: 'int',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'tb_accounts',
            new TableForeignKey({
                name: 'AccountsCustomer',
                columnNames: ['customer_id'],
                referencedTableName: 'tb_customers',
                referencedColumnNames: ['id'],
                onDelete: 'SET NULL',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tb_accounts', 'AccountsCustomer');
        await queryRunner.dropColumn('tb_accounts' ,'customer_id');
    }

}
